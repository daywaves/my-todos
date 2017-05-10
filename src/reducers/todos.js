import * as actions from '../actions';

const todo = (state, action) => {
  switch (action.type) {
    case actions.ADD_TODO:
      return { id: action.id, text: action.text, completed: false };
    case actions.TOGGLE_TODO:
      return state.id === action.id ? { ...state, completed: !state.completed } : state;
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case actions.ADD_TODO:
      return [...state, todo(undefined, action)];
    case actions.TOGGLE_TODO:
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

export default todos;

export const hasTodos = state => state.todos.length > 0;
export const getTodos = state => state.todos;
