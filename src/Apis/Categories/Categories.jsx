import axios from 'axios';




const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Get all categories
export const getAllCategories = async () => {
  try {
    console.log('Fetching categories from:',  `${import.meta.env.VITE_BASEURL}/categories`);
    const response = await axios.get( `${import.meta.env.VITE_BASEURL}/categories`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`
      }
    });
    console.log('Categories response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error.response?.data || error.message;
  }
};

// Get single category by ID
export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASEURL}/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create new category
export const createCategory = async (formData) => {
  try {
    console.log('Creating category with data:', formData);
    const response = await axios.post(`${import.meta.env.VITE_BASEURL}/categories`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getAuthToken()}`
      },
    });
    console.log('Create category response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error.response?.data || error.message;
  }
};

// Update category
export const updateCategory = async (id, formData) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_BASEURL}/categories/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getAuthToken()}`
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete category
export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_BASEURL}/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
