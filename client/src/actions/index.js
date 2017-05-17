import { normalize } from 'normalizr';
import * as schemas from './schema';
import * as api from '../api';
import * as selectors from '../reducers';

export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE';

export const TOGGLE_TODO_REQUEST = 'TOGGLE_TODO_REQUEST';
export const TOGGLE_TODO_SUCCESS = 'TOGGLE_TODO_SUCCESS';
export const TOGGLE_TODO_FAILURE = 'TOGGLE_TODO_FAILURE';

export const REMOVE_TODO_REQUEST = 'REMOVE_TODO_REQUEST';
export const REMOVE_TODO_SUCCESS = 'REMOVE_TODO_SUCCESS';
export const REMOVE_TODO_FAILURE = 'REMOVE_TODO_FAILURE';

export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';

/*
  Creates a redux thunk action.
  Arguments:
    payload:
      action payload data
    types:
      object containing request, success, and failure action types
    apiFunction:
      API function to be called (must return a promise)
    isPending (optional):
      function that checks if this action is already pending (new requests will not be initiated)
    schema (optional):
      normalizr schema to use on the response
*/
const createThunkAction = (payload, types, apiFunction, isPending, schema) => (
  dispatch,
  getState,
) => {
  if (isPending && isPending(getState())) {
    return Promise.resolve();
  }
  dispatch({ type: types.request, payload });

  return apiFunction().then(
    (response) => {
      const action = {
        type: types.success,
        payload,
      };
      if (schema) {
        action.response = normalize(response, schema);
      }
      dispatch(action);
    },
    error => dispatch({ type: types.failure, message: error.message || 'Something went wrong' }),
  );
};

export const addTodo = text =>
  createThunkAction(
    text,
    {
      request: ADD_TODO_REQUEST,
      success: ADD_TODO_SUCCESS,
      failure: ADD_TODO_FAILURE,
    },
    () => api.addTodo(text),
    null,
    schemas.todo,
  );

export const toggleTodo = (id, completed) =>
  createThunkAction(
    id,
    {
      request: TOGGLE_TODO_REQUEST,
      success: TOGGLE_TODO_SUCCESS,
      failure: TOGGLE_TODO_FAILURE,
    },
    () => api.toggleTodo(id, completed),
    state => selectors.todoIsPending(state, id),
    schemas.todo,
  );

export const removeTodo = id =>
  createThunkAction(
    id,
    {
      request: REMOVE_TODO_REQUEST,
      success: REMOVE_TODO_SUCCESS,
      failure: REMOVE_TODO_FAILURE,
    },
    () => api.removeTodo(id),
    state => selectors.todoIsPending(state, id),
  );

export const fetchTodos = filter =>
  createThunkAction(
    filter,
    {
      request: FETCH_TODOS_REQUEST,
      success: FETCH_TODOS_SUCCESS,
      failure: FETCH_TODOS_FAILURE,
    },
    () => api.fetchTodos(filter),
    state => selectors.filterIsFetching(state, filter),
    schemas.todos,
  );
