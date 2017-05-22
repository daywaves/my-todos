import { combineReducers } from 'redux';
import * as actions from '../actions';

const createFilterList = (filter) => {
  const ids = (state = [], action) => {
    switch (action.type) {
      case actions.FETCH_TODOS_SUCCESS:
        return action.filter === filter ? action.response.result : state;
      case actions.ADD_TODO_SUCCESS:
        if (filter !== 'completed') {
          return [...state, action.response.result];
        }
        return state;
      case actions.TOGGLE_TODO_SUCCESS:
        if (
          (filter === 'active' && !action.completed) ||
          (filter === 'completed' && action.completed)
        ) {
          return [...state, action.response.result];
        }
        if (filter !== 'all') {
          return state.filter(id => id !== action.response.result);
        }
        return state;
      case actions.REMOVE_TODO_SUCCESS:
        return state.filter(id => id !== action.id);
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case actions.FETCH_TODOS_REQUEST:
        return true;
      case actions.FETCH_TODOS_SUCCESS:
      case actions.FETCH_TODOS_FAILURE:
        return false;
      default:
        return state;
    }
  };

  const error = (state = null, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case actions.FETCH_TODOS_FAILURE:
        return action.message;
      case actions.FETCH_TODOS_REQUEST:
        return null;
      default:
        return state;
    }
  };

  return combineReducers({ ids, isFetching, error });
};

export default createFilterList;

export const getIDs = state => state.ids.slice();
export const isFetching = state => state.isFetching;
export const getErrorMessage = state => state.error;
export const getIndexOfID = (state, id) => state.ids.indexOf(id);
