import * as actions from '../actions';
import { getTodos } from './index';

const visibilityFilter = (state = 'ALL', action) => {
  switch (action.type) {
    case actions.SET_VISIBILITY:
      return action.filter;
    default:
      return state;
  }
};

export default visibilityFilter;

const FILTER_STATE_ALL = { filter: 'ALL', label: 'All' };
const FILTER_STATE_ACTIVE = { filter: 'ACTIVE', label: 'Active' };
const FILTER_STATE_COMPLETED = { filter: 'COMPLETED', label: 'Completed' };

export const FILTER_STATES = [FILTER_STATE_ALL, FILTER_STATE_ACTIVE, FILTER_STATE_COMPLETED];

export const getVisibleTodos = (state) => {
  const filter = state.visibilityFilter;
  const todos = getTodos(state);
  switch (filter) {
    case FILTER_STATE_ALL.filter:
      return todos;
    case FILTER_STATE_ACTIVE.filter:
      return todos.filter(t => !t.completed);
    case FILTER_STATE_COMPLETED.filter:
      return todos.filter(t => t.completed);
    default:
      throw new Error(`Invalid todos filter: ${filter}`);
  }
};

export const getCurrentVisibilityFiler = state => state.visibilityFilter;
