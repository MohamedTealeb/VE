import axios from 'axios';

// Get the token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add token to all requests
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Get all sizes
export const getAllSizes = async () => {
  try {
    const response = await api.get('/sizes');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get size by ID
export const getSizeById = async (id) => {
  try {
    const response = await api.get(`/sizes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create new size
export const createSize = async (sizeData) => {
  try {
    console.log('Creating size with data:', sizeData);
    const response = await api.post('/sizes', sizeData);
    console.log('Size API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Size API Error:', error);
    throw error.response?.data || error.message;
  }
};

// Update size
export const updateSize = async (id, sizeData) => {
  try {
    const response = await api.put(`/sizes/${id}`, sizeData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete size
export const deleteSize = async (id) => {
  try {
    const response = await api.delete(`/sizes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 