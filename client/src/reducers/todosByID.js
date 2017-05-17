import * as actions from '../actions';

const todosByID = (state = {}, action) => {
  if (action.response) {
    const nextState = { ...state };
    const newTodos = action.response.entities.todos;
    Object.keys(newTodos).map(id => (nextState[id] = { ...newTodos[id], isPending: false }));
    return nextState;
  }
  switch (action.type) {
    case actions.TOGGLE_TODO_REQUEST:
    case actions.REMOVE_TODO_REQUEST:
      return { ...state, [action.payload]: { ...state[action.payload], isPending: true } };
    case actions.TOGGLE_TODO_SUCCESS:
    case actions.TOGGLE_TODO_FAILURE:
    case actions.REMOVE_TODO_FAILURE:
      return { ...state, [action.payload]: { ...state[action.payload], isPending: false } };
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
