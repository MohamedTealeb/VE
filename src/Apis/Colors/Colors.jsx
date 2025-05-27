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
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data
    });
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to log responses
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

// Get all colors
export const getAllColors = async () => {
  try {
    console.log('Fetching colors...');
    const response = await api.get('/colors');
    console.log('Colors API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Colors API Error:', error);
    throw error.response?.data || error.message;
  }
};

// Get color by ID
export const getColorById = async (id) => {
  try {
    const response = await api.get(`/colors/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create new color
export const createColor = async (colorData) => {
  try {
    console.log('Creating color with data:', colorData);
    // Format data to match API expectations
    const formattedData = {
      name: colorData.name,
      hex: colorData.hexCode
    };
    console.log('Formatted color data:', formattedData);
    const response = await api.post('/colors', formattedData);
    console.log('Color API Response:', response.data);
    // Ensure we return an object with id
    return {
      id: response.data.id || Date.now(), // Fallback to timestamp if no id
      ...response.data
    };
  } catch (error) {
    console.error('Color API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw error.response?.data || error.message;
  }
};

// Update color
export const updateColor = async (id, colorData) => {
  try {
    console.log('Updating color with data:', { id, ...colorData });
    // Format data to match API expectations
    const formattedData = {
      name: colorData.name,
      hex: colorData.hexCode
    };
    console.log('Formatted update data:', formattedData);
    const response = await api.put(`/colors/${id}`, formattedData);
    console.log('Color Update Response:', response.data);
    return {
      id,
      ...response.data
    };
  } catch (error) {
    console.error('Color Update Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw error.response?.data || error.message;
  }
};

// Delete color
export const deleteColor = async (id) => {
  try {
    const response = await api.delete(`/colors/${id}`);
    return { id, ...response.data };
  } catch (error) {
    throw error.response?.data || error.message;
  }
};