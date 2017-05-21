import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL.replace(/\/?$/, '/'); // Ensure URL ends with a slash

export const fetchTodos = async (filter) => {
  const params = filter === 'all' ? null : { filter };
  const response = await axios.get(`${API_URL}todos`, { params });
  return response.data;
};

export const addTodo = async (text) => {
  const response = await axios.post(`${API_URL}todos`, { text });
  return response.data;
};

export const toggleTodo = async (id, completed) => {
  const response = await axios.put(`${API_URL}todos/${id}`, { completed });
  return response.data;
};

export const editTodo = async (id, text) => {
  const response = await axios.put(`${API_URL}todos/${id}`, { text });
  return response.data;
};

export const removeTodo = async (id) => {
  const response = await axios.delete(`${API_URL}todos/${id}`);
  return response.data;
};
