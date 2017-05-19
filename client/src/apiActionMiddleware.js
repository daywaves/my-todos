import { normalize } from 'normalizr';

/*
  Redux middleware function allowing dispatch of API actions.
  An API action is an object containing the following keys:
    types:
      An object with keys request, success, and failure pointing to corresponding action types.
    callAPI:
      Function that performs the actual API call and returns a promise.
    shouldCallAPI (optional):
      Function that determines if the API call should be invoked or not. If not specified it will
      always be invoked. Used for caching, preventing repeated or conflicting actions, etc.
    payload (optional):
      Object containing properties to be included in all actions.
    schema (optional):
      normalizr schema to apply to the API call response. If not specified the API response will not
      be included in the success action.
    onError (optional):
      Function to be called when callAPI results in an error.
      Receives error, dispatch, and getState as arguments.
*/
const apiActionMiddleware = ({ dispatch, getState }) => next => async (action) => {
  const { types, callAPI, shouldCallAPI = () => true, payload = {}, schema, onError } = action;

  if (!types || !callAPI) {
    // Not an API action so pass it on
    return next(action);
  }

  if (!types.request || !types.success || !types.failure) {
    throw new Error('Invalid API action: missing an action type');
  }
  if (typeof callAPI !== 'function') {
    throw new Error('Expected callAPI to be a function');
  }

  if (!shouldCallAPI(getState())) {
    return null;
  }

  dispatch({ type: types.request, ...payload });
  let response = null;
  try {
    response = await callAPI();
    const successAction = {
      type: types.success,
      ...payload,
    };
    if (schema) {
      successAction.response = normalize(response, schema);
    }
    dispatch(successAction);
  } catch (error) {
    dispatch({
      type: types.failure,
      message: error.message || 'Something went wrong',
      ...payload,
    });
    if (onError) {
      onError(error, dispatch, getState);
    }
  }
  return response;
};

export default apiActionMiddleware;
