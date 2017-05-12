const todosByID = (state = {}, action) => {
  if (action.response) {
    return { ...state, ...action.response.entities.todos };
  }
  return state;
};

export default todosByID;

export const getTodoByID = (state, id) => state[id];
