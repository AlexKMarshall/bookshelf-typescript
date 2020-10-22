import {
  Dispatch,
  useCallback,
  useLayoutEffect,
  useState,
  useRef,
} from "react";

function useSafeDispatch<State>(dispatch: Dispatch<State>) {
  const mounted = useRef(false);
  useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return useCallback(
    (arg: State) => (mounted.current ? dispatch(arg) : void 0),
    [dispatch]
  );
}

type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: any };

const defaultInitialState = { status: "idle" as const };

function useAsync<T>(initialState: AsyncState<T> = defaultInitialState) {
  const initialStateRef = useRef(initialState);

  const [state, setState] = useState(initialStateRef.current);

  const safeSetState = useSafeDispatch(setState);

  const setData = useCallback(
    (data: T) => safeSetState({ data, status: "success" }),
    [safeSetState]
  );
  const setError = useCallback(
    (error: any) => safeSetState({ error, status: "error" }),
    [safeSetState]
  );
  const reset = useCallback(() => safeSetState({ status: "idle" }), [
    safeSetState,
  ]);

  const run = useCallback(
    (promise: Promise<T>) => {
      safeSetState({ status: "loading" });
      return promise.then(
        (data) => {
          setData(data);
          return data;
        },
        (error) => {
          setError(error);
        }
      );
    },
    [safeSetState, setData, setError]
  );

  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    data: state.status === "success" ? state.data : undefined,
    error: state.status === "error" ? state.error : undefined,
    run,
    reset,
    status: state.status,
  };
}

export { useAsync };
