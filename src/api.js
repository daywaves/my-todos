import uuidV4 from 'uuid/v4';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const makeTodo = (text, completed = false) => ({ id: uuidV4(), text, completed });

const todos = [makeTodo('Test this app', true), makeTodo('Learn french'), makeTodo('Party')];

const API_DELAY = 300;

export const fetchTodos = filter =>
  delay(API_DELAY).then(() => {
    switch (filter) {
      case 'all':
        return todos;
      case 'active':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed);
      default:
        throw new Error(`Invalid todos filter: ${filter}`);
    }
  });

export const addTodo = text =>
  delay(API_DELAY).then(() => {
    const todo = makeTodo(text);
    todos.push(todo);
    return todo;
  });

export const toggleTodo = id =>
  delay(API_DELAY).then(() => {
    const todo = todos.find(t => t.id === id);
    todo.completed = !todo.completed;
    return todo;
  });
