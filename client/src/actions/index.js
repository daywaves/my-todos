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

export const addTodo = text => ({
  types: {
    request: ADD_TODO_REQUEST,
    success: ADD_TODO_SUCCESS,
    failure: ADD_TODO_FAILURE,
  },
  callAPI: () => api.addTodo(text),
  payload: { text },
  schema: schemas.todo,
});

export const toggleTodo = (id, completed) => ({
  types: {
    request: TOGGLE_TODO_REQUEST,
    success: TOGGLE_TODO_SUCCESS,
    failure: TOGGLE_TODO_FAILURE,
  },
  callAPI: () => api.toggleTodo(id, completed),
  shouldCallAPI: state => !selectors.todoIsPending(state, id),
  payload: { id },
  schema: schemas.todo,
});

export const removeTodo = id => ({
  types: {
    request: REMOVE_TODO_REQUEST,
    success: REMOVE_TODO_SUCCESS,
    failure: REMOVE_TODO_FAILURE,
  },
  callAPI: () => api.removeTodo(id),
  shouldCallAPI: state => !selectors.todoIsPending(state, id),
  payload: { id },
});

export const fetchTodos = filter => ({
  types: {
    request: FETCH_TODOS_REQUEST,
    success: FETCH_TODOS_SUCCESS,
    failure: FETCH_TODOS_FAILURE,
  },
  callAPI: () => api.fetchTodos(filter),
  shouldCallAPI: state => !selectors.filterIsFetching(state, filter),
  payload: { filter },
  schema: schemas.todos,
});
