import axios from 'axios';




const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Get all categories
export const getAllCategories = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${import.meta.env.VITE_BASEURL}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.message === 'No authentication token found') {
      throw { message: 'Please login to access this resource' };
    }
    if (error.response?.status === 401) {
      throw { message: 'Your session has expired. Please login again' };
    }
    throw error.response?.data || { message: 'Failed to fetch categories' };
  }
};

// Get single category by ID
export const getCategoryById = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${import.meta.env.VITE_BASEURL}/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.message === 'No authentication token found') {
      throw { message: 'Please login to access this resource' };
    }
    if (error.response?.status === 401) {
      throw { message: 'Your session has expired. Please login again' };
    }
    throw error.response?.data || { message: 'Failed to fetch category' };
  }
};

// Create new category
export const createCategory = async (formData) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${import.meta.env.VITE_BASEURL}/categories`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error) {
    if (error.message === 'No authentication token found') {
      throw { message: 'Please login to access this resource' };
    }
    if (error.response?.status === 401) {
      throw { message: 'Your session has expired. Please login again' };
    }
    throw error.response?.data || { message: 'Failed to create category' };
  }
};

// Update category
export const updateCategory = async (id, formData) => {
  try {
    const token = getAuthToken();
    const response = await axios.put(`${import.meta.env.VITE_BASEURL}/categories/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error) {
    if (error.message === 'No authentication token found') {
      throw { message: 'Please login to access this resource' };
    }
    if (error.response?.status === 401) {
      throw { message: 'Your session has expired. Please login again' };
    }
    throw error.response?.data || { message: 'Failed to update category' };
  }
};

// Delete category
export const deleteCategory = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axios.delete(`${import.meta.env.VITE_BASEURL}/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    if (error.message === 'No authentication token found') {
      throw { message: 'Please login to access this resource' };
    }
    if (error.response?.status === 401) {
      throw { message: 'Your session has expired. Please login again' };
    }
    if (error.response?.status === 403) {
      throw { message: 'Access denied', status: 403 };
    }
    throw error.response?.data || { message: 'Failed to delete category' };
  }
};
