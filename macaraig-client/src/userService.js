import axios from 'axios';
import { API_URL } from './constants';

const getUsers = async (token) => {
  const response = await axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/users/login`, { email, password });
  return response.data;
};

const registerUser = async (userData, token) => {
  const response = await axios.post(`${API_URL}/users/register`, userData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};


const updateUser = async (id, userData, token) => {
  const response = await axios.put(`${API_URL}/users/${id}`, userData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export default { getUsers, loginUser, registerUser, updateUser };