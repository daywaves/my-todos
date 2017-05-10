import { combineReducers } from 'redux';
import todos, * as fromTodos from './todos';

export default combineReducers({ todos });

export const hasTodos = state => fromTodos.hasTodos(state);

export const getTodos = state => fromTodos.getTodos(state);

export const getVisibleTodos = (state, filter) => {
  const localTodos = getTodos(state);
  switch (filter) {
    case 'all':
      return localTodos;
    case 'active':
      return localTodos.filter(t => !t.completed);
    case 'completed':
      return localTodos.filter(t => t.completed);
    default:
      throw new Error(`Invalid todos filter: ${filter}`);
  }
};
