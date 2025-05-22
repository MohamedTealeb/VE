import axios from 'axios';


// Get all sizes
export const getAllSizes = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASEURL}/sizes`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch sizes');
  }
};

// Get size by ID
export const getSizeById = async (id) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASEURL}/sizes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch size');
  }
};

// Create new size
export const createSize = async (sizeData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASEURL}/sizes`, sizeData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create size');
  }
};

// Update size
export const updateSize = async ({ id, ...sizeData }) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_BASEURL}/sizes/${id}`, sizeData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update size');
  }
};

// Delete size
export const deleteSize = async (id) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_BASEURL}/sizes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete size');
  }
}; 