import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const fetchTodos = filter =>
  axios.get(`${API_URL}/todos/${filter === 'all' ? '' : filter}`).then(response => response.data);

export const addTodo = text =>
  axios.post(`${API_URL}/todos`, { text }).then(response => response.data);

export const toggleTodo = todo =>
  axios
    .put(`${API_URL}/todos/${todo.id}`, { ...todo, completed: !todo.completed })
    .then(response => response.data);
