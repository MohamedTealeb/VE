import axios from 'axios';

const getAuthToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  return token;
};

export const getAllUsers = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${import.meta.env.VITE_BASEURL}/users`, {
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
    throw error.response?.data || { message: 'Failed to fetch users' };
  }
};

export const getUserById = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${import.meta.env.VITE_BASEURL}/users/${id}`, {
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
    throw error.response?.data || { message: 'Failed to fetch user' };
  }
};

export const createUser = async (userData) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${import.meta.env.VITE_BASEURL}/users`, userData, {
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
    throw error.response?.data || { message: 'Failed to create user' };
  }
};

export const updateUser = async (id, userData) => {
  try {
    const token = getAuthToken();
    const response = await axios.put(`${import.meta.env.VITE_BASEURL}/users/${id}`, userData, {
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
    throw error.response?.data || { message: 'Failed to update user' };
  }
};

export const deleteUser = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axios.delete(`${import.meta.env.VITE_BASEURL}/users/${id}`, {
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
    throw error.response?.data || { message: 'Failed to delete user' };
  }
};
