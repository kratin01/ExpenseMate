
// client/src/api/auth.js
// This file contains API calls related to user authentication, such as registration, login, and fetching
import api from './axiosConfig';

export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials);
export const getCurrentUser = () => api.get('/auth/me');