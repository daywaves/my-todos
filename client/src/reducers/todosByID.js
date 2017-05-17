import * as actions from '../actions';

const todo = (state, action) => {
  switch (action.type) {
    case actions.TOGGLE_TODO_REQUEST:
    case actions.REMOVE_TODO_REQUEST:
      return { ...state, isPending: true };
    case actions.FETCH_TODOS_SUCCESS:
    case actions.ADD_TODO_SUCCESS:
    case actions.TOGGLE_TODO_SUCCESS:
    case actions.TOGGLE_TODO_FAILURE:
    case actions.REMOVE_TODO_FAILURE:
      return { ...state, isPending: false };
    default:
      return state;
  }
};

const todosByID = (state = {}, action) => {
  switch (action.type) {
    case actions.FETCH_TODOS_SUCCESS:
    case actions.ADD_TODO_SUCCESS:
    case actions.TOGGLE_TODO_SUCCESS: {
      const nextState = { ...state };
      const newTodos = action.response.entities.todos;
      Object.keys(newTodos).map(id => (nextState[id] = todo(newTodos[id], action)));
      return nextState;
    }
    case actions.TOGGLE_TODO_REQUEST:
    case actions.REMOVE_TODO_REQUEST:
    case actions.TOGGLE_TODO_FAILURE:
    case actions.REMOVE_TODO_FAILURE:
      return { ...state, [action.payload]: todo(state[action.payload], action) };
    case actions.REMOVE_TODO_SUCCESS: {
      const nextState = { ...state };
      delete nextState[action.payload];
      return nextState;
    }
    default:
      return state;
  }
};

export default todosByID;

export const getTodoByID = (state, id) => state[id];
export const isPendingByID = (state, id) => state[id].isPending;
