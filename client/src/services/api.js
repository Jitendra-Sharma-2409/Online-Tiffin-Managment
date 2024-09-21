import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['token'] = token;
  }
  return config;
});

// User APIs
export const login = (credentials) => api.users.post('/login', credentials);
export const signup = (data) => api.post('/users/signup', data);
export const getUsers = () => api.get('/users');
export const getProfile = () => api.get('/users/profile');
export const updateProfile = (data) => api.put('/users/profile', data);

// Order APIs
export const getOrders = () => api.get('/orders');
export const createOrder = (orderData) => api.post('/orders/create', orderData);
export const updateOrder = (orderData) => api.put('/orders/update', orderData);

// Menu APIs
export const addMenuItem = (item) => api.post('/menu/add', item);
export const getMenuItems = () => api.get('/menu/all');
export const updateMenuItem = (id, item) => api.put(`/menu/${id}`, item);
export const deleteMenuItem = (id) => api.delete(`/menu/${id}`);

export default api;
