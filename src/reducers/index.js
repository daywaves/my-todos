import { combineReducers } from 'redux';
import todosByID, * as fromTodosByID from './todosByID';
import createFilterList, * as fromFilterList from './createFilterList';
import notificationList from './notificationList';

const listByFilter = combineReducers({
  all: createFilterList('all'),
  active: createFilterList('active'),
  completed: createFilterList('completed'),
});

export default combineReducers({ todosByID, listByFilter, notificationList });

export const todoIsPending = (state, id) => fromTodosByID.isPendingByID(state.todosByID, id);

export const getVisibleTodos = (state, filter) => {
  const ids = fromFilterList.getIDs(state.listByFilter[filter]);
  // Keep other filter lists in same order as 'all' list
  // (Order can be incorrect after toggling a todo and pushing it to the active/completed list)
  ids.sort(
    (firstID, secondID) =>
      fromFilterList.getIndexOfID(state.listByFilter.all, firstID) -
      fromFilterList.getIndexOfID(state.listByFilter.all, secondID),
  );
  return ids.map(id => fromTodosByID.getTodoByID(state.todosByID, id));
};

export const filterIsFetching = (state, filter) =>
  fromFilterList.isFetching(state.listByFilter[filter]);
export const getErrorMessage = (state, filter) =>
  fromFilterList.getErrorMessage(state.listByFilter[filter]);
