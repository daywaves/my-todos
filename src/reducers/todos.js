import * as actions from '../actions';

const todos = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_TODOS_SUCCESS:
      return action.response;
    case actions.ADD_TODO_SUCCESS:
      return [...state, action.response];
    case actions.TOGGLE_TODO_SUCCESS:
      return state.map(todo => (todo.id === action.response.id ? action.response : todo));
    default:
      return state;
  }
};

export default todos;

export const hasTodos = state => state.todos.length > 0;
export const getTodos = state => state.todos;
