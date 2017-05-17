import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const fetchTodos = (filter) => {
  const params = filter === 'all' ? null : { filter };
  return axios.get(`${API_URL}/todos`, { params }).then(response => response.data);
};

export const addTodo = text =>
  axios.post(`${API_URL}/todos`, { text }).then(response => response.data);

export const toggleTodo = todo =>
  axios
    .put(`${API_URL}/todos/${todo.id}`, { completed: !todo.completed })
    .then(response => response.data);

export const removeTodo = id =>
  axios.delete(`${API_URL}/todos/${id}`).then(response => response.data);
