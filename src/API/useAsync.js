import {useState, useEffect, useCallback, useContext} from 'react';
import {StoreContext} from '../global/appContexts';
// Hook
const useAsync = (asyncFunction, immediate = true) => {
  const [pending, setPending] = useState(false);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const {store, dispatch} = useContext(StoreContext);
  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(
    param => {
      if (store.isConnected === false) {
        console.log(
          '** useAsync --> checking connection --> ',
          store.isConnected,
        );
        setValue(null);
        dispatch({
          type: 'CONNECTION_ERROR',
          payload: {errorType: 'CONNECTION_ERROR'},
        });
        setPending(false);
        return;
      }
      setPending(true);
      setValue(null);
      setError(null);

      return asyncFunction(param)
        .then(response => {
          if (response.ok) {
            dispatch({type: response.type});
            setValue(response);
          } else {
            dispatch({
              type: response.type,
              payload: {errorType: response.errorType},
            });
            setError(response);
          }
        })
        .catch(error => {
          dispatch({type: error.type, payload: {errorType: error.errorType}});
          setError(error);
        })
        .finally(() => setPending(false));
    },
    [asyncFunction, dispatch, store.isConnected],
  );

  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {execute, pending, value, error};
};

export default useAsync;
