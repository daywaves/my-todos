import { normalize } from 'normalizr';
import * as schemas from './schema';
import * as api from '../api';

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
  Creates a typical thunk action.
  Arguments:
    payload: action payload data
    types: object containing request, success, and failure action types
    func: API function to be called (must return a promise)
    schema: normalizr schema to use on the response (optional)
*/
const createThunkAction = (payload, types, func, schema) => (dispatch) => {
  dispatch({ type: types.request, payload });

  func().then(
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
    schemas.todo,
  );

export const toggleTodo = todo =>
  createThunkAction(
    todo,
    {
      request: TOGGLE_TODO_REQUEST,
      success: TOGGLE_TODO_SUCCESS,
      failure: TOGGLE_TODO_FAILURE,
    },
    () => api.toggleTodo(todo),
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
    schemas.todos,
  );
