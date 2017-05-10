import { combineReducers } from 'redux';
import todos, * as fromTodos from './todos';
import visibilityFilter, * as fromVisibilityFilter from './visibilityFilter';

export default combineReducers({ todos, visibilityFilter });

export const hasTodos = state => fromTodos.hasTodos(state);

export const getTodos = state => fromTodos.getTodos(state);

export const FILTER_STATES = fromVisibilityFilter.FILTER_STATES;

export const getCurrentVisibilityFiler = state =>
  fromVisibilityFilter.getCurrentVisibilityFiler(state);

export const getVisibleTodos = state => fromVisibilityFilter.getVisibleTodos(state);
