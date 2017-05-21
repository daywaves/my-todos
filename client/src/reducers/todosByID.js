import * as actions from '../actions';

const todo = (state, action) => {
  switch (action.type) {
    case actions.TOGGLE_TODO_REQUEST:
    case actions.EDIT_TODO_REQUEST:
    case actions.REMOVE_TODO_REQUEST:
      return { ...state, pendingAction: action.type };
    case actions.FETCH_TODOS_SUCCESS:
    case actions.ADD_TODO_SUCCESS:
    case actions.TOGGLE_TODO_SUCCESS:
    case actions.EDIT_TODO_SUCCESS:
    case actions.TOGGLE_TODO_FAILURE:
    case actions.EDIT_TODO_FAILURE:
    case actions.REMOVE_TODO_FAILURE:
      return { ...state, pendingAction: null };
    default:
      return state;
  }
};

const todosByID = (state = {}, action) => {
  switch (action.type) {
    // All actions that return new or updated todos entities
    case actions.FETCH_TODOS_SUCCESS:
    case actions.ADD_TODO_SUCCESS:
    case actions.TOGGLE_TODO_SUCCESS:
    case actions.EDIT_TODO_SUCCESS: {
      const nextState = { ...state };
      const newTodos = action.response.entities.todos;
      if (newTodos) {
        Object.keys(newTodos).map(id => (nextState[id] = todo(newTodos[id], action)));
      }
      return nextState;
    }
    // All actions that need to be directed to todo reducer to update a todo
    case actions.TOGGLE_TODO_REQUEST:
    case actions.EDIT_TODO_REQUEST:
    case actions.REMOVE_TODO_REQUEST:
    case actions.TOGGLE_TODO_FAILURE:
    case actions.EDIT_TODO_FAILURE:
    case actions.REMOVE_TODO_FAILURE:
      return { ...state, [action.id]: todo(state[action.id], action) };

    case actions.REMOVE_TODO_SUCCESS: {
      const nextState = { ...state };
      delete nextState[action.id];
      return nextState;
    }
    default:
      return state;
  }
};

export default todosByID;

export const getTodoByID = (state, id) => state[id];
export const isPendingByID = (state, id) => state[id].pendingAction !== null;
