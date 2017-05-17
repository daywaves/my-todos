import * as actions from '../actions';

const todosByID = (state = {}, action) => {
  if (action.response) {
    return { ...state, ...action.response.entities.todos };
  }
  if (action.type === actions.REMOVE_TODO_SUCCESS) {
    const nextState = { ...state };
    delete nextState[action.payload];
    return nextState;
  }
  return state;
};

export default todosByID;

export const getTodoByID = (state, id) => state[id];
