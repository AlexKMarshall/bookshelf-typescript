## Throwing errors in client API function

If you reject a promise (because !response.ok), you have to return
Promise.reject, not just call it, otherwise the catch block won't catch it Also,
when rejecting it, we need to reject it with the actual data, not a promise of
the data (because response.json() is an async function). So just await the data
before doing the error handling

## useAsync hook

This abstracts away the process of setting a status and collecting data/error
returned from an async operation. If a React component is unmounted before an
async call returns, a regular setState in the useEffect hook will attempt to
update still, which shouldn't happen. The useAsync hook will only do the state
update if the component is still mounted.
