import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || 'שגיאה בתקשורת עם השרת';
    
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    
    return Promise.reject(new Error(message));
  }
);

// Auth API
export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  verifyToken: () => api.get('/auth/me'),
  changePassword: (passwordData) => api.put('/auth/change-password', passwordData),
};

// Articles API
export const articlesApi = {
  getAll: (params) => api.get('/articles', { params }),
  getById: (id) => api.get(`/articles/${id}`),
  create: (formData) => api.post('/articles', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => api.put(`/articles/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/articles/${id}`),
  getStats: () => api.get('/articles/stats/summary'),
  getAllAdmin: (params) => api.get('/articles/admin/all', { params }),
};

// Gallery API
export const galleryApi = {
  getAll: (params) => api.get('/gallery', { params }),
  getById: (id) => api.get(`/gallery/${id}`),
  upload: (formData) => api.post('/gallery', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, data) => api.put(`/gallery/${id}`, data),
  delete: (id) => api.delete(`/gallery/${id}`),
  bulkAction: (data) => api.post('/gallery/bulk', data),
  getStats: () => api.get('/gallery/stats/summary'),
  getAllAdmin: (params) => api.get('/gallery/admin/all', { params }),
};

// Health Declarations API
export const healthDeclarationsApi = {
  submit: (data) => api.post('/health-declarations', data),
  getAll: (params) => api.get('/health-declarations', { params }),
  getById: (id) => api.get(`/health-declarations/${id}`),
  delete: (id) => api.delete(`/health-declarations/${id}`),
  getStats: () => api.get('/health-declarations/stats/summary'),
};

export default api;