import axios from 'axios';
import { config as serverConfig } from './config';

const api = axios.create({
  baseURL: serverConfig.server,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding authentication token
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optional: Handle token expiration or unauthorized access
      // sessionStorage.clear();
      // window.location.href = '/';
    }
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;
