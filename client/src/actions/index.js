import { normalize } from 'normalizr';
import * as schemas from './schema';
import * as api from '../api';

export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE';

export const TOGGLE_TODO_REQUEST = 'TOGGLE_TODO_REQUEST';
export const TOGGLE_TODO_SUCCESS = 'TOGGLE_TODO_SUCCESS';
export const TOGGLE_TODO_FAILURE = 'TOGGLE_TODO_FAILURE';

export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';

export const addTodo = text => (dispatch) => {
  dispatch({ type: ADD_TODO_REQUEST, text });

  api.addTodo(text).then(
    response =>
      dispatch({
        type: ADD_TODO_SUCCESS,
        response: normalize(response, schemas.todo),
      }),
    error =>
      dispatch({
        type: {
          type: ADD_TODO_FAILURE,
          message: error.message || 'Something went wrong',
        },
      }),
  );
};

export const toggleTodo = todo => (dispatch) => {
  dispatch({ type: TOGGLE_TODO_REQUEST, todo });

  api.toggleTodo(todo).then(
    response =>
      dispatch({
        type: TOGGLE_TODO_SUCCESS,
        response: normalize(response, schemas.todo),
      }),
    error =>
      dispatch({
        type: TOGGLE_TODO_FAILURE,
        message: error.message || 'Something went wrong.',
      }),
  );
};

export const fetchTodos = filter => (dispatch) => {
  dispatch({ type: FETCH_TODOS_REQUEST, filter });

  api.fetchTodos(filter).then(
    response =>
      dispatch({
        type: FETCH_TODOS_SUCCESS,
        filter,
        response: normalize(response, schemas.todos),
      }),
    error =>
      dispatch({
        type: FETCH_TODOS_FAILURE,
        filter,
        message: error.message || 'Something went wrong',
      }),
  );
};
