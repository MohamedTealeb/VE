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

// Get all products
export const getAllProducts = async () => {
  try {
    console.log('Fetching products from:', `${import.meta.env.VITE_BASEURL}/products`);
    const response = await api.get('/products');
    console.log('Products API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Products API Error:', error);
    throw error.response?.data || error.message;
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create new product
export const createProduct = async (productData) => {
  try {
    console.log('Creating product with data:', productData);
    const response = await api.post('/products', productData);
    console.log('Create Product Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Create Product Error:', error);
    throw error.response?.data || error.message;
  }
};

// Update product
export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 