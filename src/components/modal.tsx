/** @jsx jsx */
import { jsx } from "@emotion/core";

import React, { useContext, useRef, useState } from "react";
import { useTransition, animated, useSpring, useChain } from "react-spring";

import { DialogProps, DialogOverlay } from "@reach/dialog";
import VisuallyHidden from "@reach/visually-hidden";
import { CircleButton, DialogContent } from "./lib";
import { usePrefersReducedMotion } from "hooks/prefers-reduced-motion";

type CallbackType = (...args: any[]) => void;

const callAll = (...fns: CallbackType[]) => (...args: any[]) =>
  fns.forEach((fn) => fn && fn(...args));

type ModalContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalContext = React.createContext<ModalContextType | undefined>(
  undefined
);

const Modal: React.FC = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return <ModalContext.Provider value={{ isOpen, setIsOpen }} {...props} />;
};

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      "Model compound components cannot be rendered outside the Modal component"
    );
  }
  return context;
};

const ModalDismissButton: React.FC = ({ children: child }) => {
  const { setIsOpen } = useModalContext();

  if (!React.isValidElement(child)) {
    throw new Error(
      "ModalDismissButton must have a valid React Element as its child"
    );
  }

  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props?.onClick),
  });
};

const ModalOpenButton: React.FC = ({ children: child }) => {
  const { setIsOpen } = useModalContext();

  if (!React.isValidElement(child)) {
    throw new Error(
      "ModalOpenButton must have a valid React Element as its child"
    );
  }

  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props?.onClick),
  });
};

const AnimatedDialogContent = animated(DialogContent);
const AnimatedDialogOverlay = animated(DialogOverlay);

const ModalContentBase: React.FC<DialogProps> = ({ style, ...props }) => {
  const { setIsOpen } = useModalContext();
  return (
    <AnimatedDialogOverlay
      style={{ opacity: style?.opacity }}
      onDismiss={() => setIsOpen(false)}
    >
      <AnimatedDialogContent {...props} style={style} />
    </AnimatedDialogOverlay>
  );
};

type ModalContentsProps = { title: string } & DialogProps;

const ModalContents: React.FC<ModalContentsProps> = ({
  title,
  children,
  ...props
}) => {
  const { isOpen } = useModalContext();
  const prefersReducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<any>();
  const contentsRef = useRef<any>();
  const transitions = useTransition(isOpen, null, {
    from: {
      opacity: 0,
      transform: "scale(0)",
    },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0)" },
    immediate: prefersReducedMotion,
    config: {
      tension: 300,
    },
    ref: containerRef,
  });

  const springProps = useSpring({
    opacity: isOpen ? 1 : 0,
    config: {
      duration: 200,
    },
    ref: contentsRef,
  });

  useChain(isOpen ? [containerRef, contentsRef] : [contentsRef, containerRef]);

  return (
    <React.Fragment>
      {transitions.map(({ item, key, props: styles }) => (
        <React.Fragment key={key}>
          {item ? (
            <ModalContentBase {...props} style={styles}>
              <animated.div style={springProps}>
                <div css={{ display: "flex", justifyContent: "flex-end" }}>
                  <ModalDismissButton>
                    <CircleButton>
                      <VisuallyHidden>Close</VisuallyHidden>
                      <span aria-hidden>×</span>
                    </CircleButton>
                  </ModalDismissButton>
                </div>
                <h3 css={{ textAlign: "center", fontSize: "2rem" }}>{title}</h3>
                {children}
              </animated.div>
            </ModalContentBase>
          ) : null}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export { Modal, ModalContents, ModalOpenButton, ModalDismissButton };
