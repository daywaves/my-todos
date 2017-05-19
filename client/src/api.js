import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const fetchTodos = async (filter) => {
  const params = filter === 'all' ? null : { filter };
  const response = await axios.get(`${API_URL}/todos`, { params });
  return response.data;
};

export const addTodo = async (text) => {
  const response = await axios.post(`${API_URL}/todos`, { text });
  return response.data;
};

export const toggleTodo = async (id, completed) => {
  const response = await axios.put(`${API_URL}/todos/${id}`, { completed });
  return response.data;
};

export const removeTodo = async (id) => {
  const response = await axios.delete(`${API_URL}/todos/${id}`);
  return response.data;
};
