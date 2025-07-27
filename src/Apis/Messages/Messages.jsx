import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BASEURL}`;

// Create a new offer
export const createOffer = async (data) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    console.log('Creating offer with data:', data);
    
    // Use messages endpoint for offers
    const endpoint = `${BASE_URL}/messages`;
    const response = await axios.post(endpoint, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Create offer response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Create offer error details:', error);
    
    if (error.message === 'No authentication token found') {
      throw { message: 'Please login to access this resource' };
    }
    if (error.response?.status === 401) {
      throw { message: 'Your session has expired. Please login again' };
    }
    if (error.response?.status === 403) {
      throw { message: 'Access denied', status: 403 };
    }
    if (error.response?.status === 400) {
      // Handle validation errors
      const errorMessage = error.response.data?.message || 'Invalid data provided';
      throw { message: errorMessage };
    }
    if (error.response?.status === 404) {
      throw { message: 'Product not found. Please check the Product ID.' };
    }
    if (error.response?.status >= 500) {
      console.error('Server error details:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers
      });
      throw { message: `Server error (${error.response.status}): ${error.response.data?.message || 'Internal server error'}` };
    }
    
    // Handle network errors
    if (error.code === 'NETWORK_ERROR' || error.code === 'ERR_NETWORK') {
      throw { message: 'Network error. Please check your connection.' };
    }
    
    // Handle other errors
    const errorMessage = error.response?.data?.message || error.message || 'Failed to create offer';
    throw { message: errorMessage };
  }
};

// Create a new message
export const createMessage = async (data) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    console.log('Creating message with data:', data);
    
    const response = await axios.post(`${BASE_URL}/messages`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Create message response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Create message error details:', error);
    
    if (error.message === 'No authentication token found') {
      throw { message: 'Please login to access this resource' };
    }
    if (error.response?.status === 401) {
      throw { message: 'Your session has expired. Please login again' };
    }
    if (error.response?.status === 403) {
      throw { message: 'Access denied', status: 403 };
    }
    if (error.response?.status === 400) {
      // Handle validation errors
      const errorMessage = error.response.data?.message || 'Invalid data provided';
      throw { message: errorMessage };
    }
    if (error.response?.status === 404) {
      throw { message: 'Product not found. Please check the Product ID.' };
    }
    if (error.response?.status >= 500) {
      console.error('Server error details:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers
      });
      throw { message: `Server error (${error.response.status}): ${error.response.data?.message || 'Internal server error'}` };
    }
    
    // Handle network errors
    if (error.code === 'NETWORK_ERROR' || error.code === 'ERR_NETWORK') {
      throw { message: 'Network error. Please check your connection.' };
    }
    
    // Handle other errors
    const errorMessage = error.response?.data?.message || error.message || 'Failed to create message';
    throw { message: errorMessage };
  }
};

// Get all messages
export const getAllMessages = async (filters = {}) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    // Add include parameter to get product details
    params.append('include', 'product');

    const response = await axios.get(
      `${BASE_URL}/messages?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('Messages API response.data:', response.data, 'Type:', typeof response.data, 'Is Array:', Array.isArray(response.data));
    // Extract the messages array from the response
    const result = response.data?.messages || response.data || [];
    console.log('Messages API returning:', result);
    return result;
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
    throw error.response?.data || { message: 'Failed to fetch messages' };
  }
};

// Get a single message by ID
export const getMessageById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await axios.get(`${BASE_URL}/messages/${id}?include=product`, {
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
    throw error.response?.data || { message: 'Failed to fetch message' };
  }
};



// Delete a message
export const deleteMessage = async (id) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await axios.delete(`${BASE_URL}/messages/${id}`, {
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
    throw error.response?.data || { message: 'Failed to delete message' };
  }
};

