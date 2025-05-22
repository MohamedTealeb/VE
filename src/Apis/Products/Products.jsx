import axios from 'axios';



// Get all products
export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASEURL}/products`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASEURL}/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create new product
export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASEURL}/products`, productData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update product
export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_BASEURL}/products/${id}`, productData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_BASEURL}/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 