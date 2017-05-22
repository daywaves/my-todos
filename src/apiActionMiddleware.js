import { normalize } from 'normalizr';

/**
 * Redux middleware function allowing dispatch of API actions.
 * An API action is an object containing the following keys:
 *   types: An object containing request, success, and failure action types.
 *   callAPI: Function that performs the actual API call and returns a promise.
 *   [shouldCallAPI]:
 *     Function that determines if the API call should be invoked or not.
 *     If not specified it will always be invoked.
 *     Used for caching, preventing repeated or conflicting actions, etc.
 *   [payload]: Object containing properties to be included in all actions.
 *   [schema]:
 *     normalizr schema to apply to the API call response.
 *     If not specified the API response will not be included in the success action.
 *   [onError]:
 *     Function to be called when callAPI results in an error.
 *     Receives error message, dispatch, and getState as arguments.
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
    const message = error.response ? error.response.data.error : error.message;
    dispatch({
      type: types.failure,
      message,
      ...payload,
    });
    if (onError) {
      onError(message, dispatch, getState);
    }
  }
  return response;
};

export default apiActionMiddleware;
