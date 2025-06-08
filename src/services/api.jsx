import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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

// Articles API - ✅ מלא ומושלם
export const articlesApi = {
  // Public endpoints
  getAll: (params) => api.get('/articles', { params }),
  getById: (id) => api.get(`/articles/${id}`),
  
  // Protected endpoints
  create: (formData) => api.post('/articles', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => api.put(`/articles/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/articles/${id}`),
  
  // Admin endpoints
  getAllAdmin: (params) => api.get('/articles/admin/all', { params }),
  getStats: () => api.get('/articles/stats/summary'),
};

// Gallery API - ✅ מלא ומושלם
export const galleryApi = {
  // Public endpoints
  getAll: (params) => api.get('/gallery', { params }),
  getById: (id) => api.get(`/gallery/${id}`),
  
  // Protected endpoints
  upload: (formData) => api.post('/gallery', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, data) => api.put(`/gallery/${id}`, data),
  delete: (id) => api.delete(`/gallery/${id}`),
  
  // Admin endpoints
  getAllAdmin: (params) => api.get('/gallery/admin/all', { params }),
  getStats: () => api.get('/gallery/stats/summary'),
  bulkAction: (data) => api.post('/gallery/bulk', data),
};

// Health Declarations API - ✅ מלא ומושלם
export const healthDeclarationsApi = {
  // Public endpoint
  submit: (data) => api.post('/health-declarations', data),
  
  // Protected endpoints
  getAll: (params) => api.get('/health-declarations', { params }),
  getById: (id) => api.get(`/health-declarations/${id}`),
  delete: (id) => api.delete(`/health-declarations/${id}`),
  
  // Admin endpoints
  getStats: () => api.get('/health-declarations/stats/summary'),
};

// ✅ Upload utility function
export const uploadFile = async (file, endpoint = '/upload') => {
  const formData = new FormData();
  formData.append('file', file);
  
  return api.post(endpoint, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

// ✅ Generic API utilities
export const apiUtils = {
  // Generic GET with error handling
  get: async (endpoint, params = {}) => {
    try {
      return await api.get(endpoint, { params });
    } catch (error) {
      console.error(`API GET Error (${endpoint}):`, error);
      throw error;
    }
  },
  
  // Generic POST with error handling
  post: async (endpoint, data = {}) => {
    try {
      return await api.post(endpoint, data);
    } catch (error) {
      console.error(`API POST Error (${endpoint}):`, error);
      throw error;
    }
  },
  
  // Generic PUT with error handling
  put: async (endpoint, data = {}) => {
    try {
      return await api.put(endpoint, data);
    } catch (error) {
      console.error(`API PUT Error (${endpoint}):`, error);
      throw error;
    }
  },
  
  // Generic DELETE with error handling
  delete: async (endpoint) => {
    try {
      return await api.delete(endpoint);
    } catch (error) {
      console.error(`API DELETE Error (${endpoint}):`, error);
      throw error;
    }
  },

  // Batch operations
  batch: async (requests) => {
    try {
      const promises = requests.map(req => {
        switch (req.method.toLowerCase()) {
          case 'get':
            return api.get(req.url, { params: req.params });
          case 'post':
            return api.post(req.url, req.data);
          case 'put':
            return api.put(req.url, req.data);
          case 'delete':
            return api.delete(req.url);
          default:
            throw new Error(`Unsupported method: ${req.method}`);
        }
      });
      
      return await Promise.all(promises);
    } catch (error) {
      console.error('Batch API Error:', error);
      throw error;
    }
  }
};

// ✅ File download utility
export const downloadFile = async (url, filename) => {
  try {
    const response = await api.get(url, {
      responseType: 'blob'
    });
    
    const blob = new Blob([response], { type: response.type });
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Download Error:', error);
    throw error;
  }
};

// ✅ Request timeout utility
export const withTimeout = (promise, timeoutMs = 10000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
    )
  ]);
};

// ✅ Retry utility for failed requests
export const withRetry = async (apiCall, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await apiCall();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
};

// ✅ Cache utilities
const cache = new Map();

export const cacheUtils = {
  get: (key) => {
    const item = cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      cache.delete(key);
      return null;
    }
    
    return item.data;
  },
  
  set: (key, data, ttl = 300000) => { // 5 minutes default
    cache.set(key, {
      data,
      expiry: Date.now() + ttl
    });
  },
  
  clear: () => cache.clear(),
  
  delete: (key) => cache.delete(key)
};

// ✅ API with caching
export const cachedApi = {
  get: async (endpoint, params = {}, ttl = 300000) => {
    const cacheKey = `${endpoint}?${JSON.stringify(params)}`;
    const cached = cacheUtils.get(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    const response = await api.get(endpoint, { params });
    cacheUtils.set(cacheKey, response, ttl);
    return response;
  }
};

export default api;