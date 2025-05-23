import axios from 'axios';

const getAuthToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  return token;
};

export const getAllOrders = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${import.meta.env.VITE_BASEURL}/orders`, {
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
    throw error.response?.data || { message: 'Failed to fetch orders' };
  }
};

export const getOrderById = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${import.meta.env.VITE_BASEURL}/orders/${id}`, {
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
    throw error.response?.data || { message: 'Failed to fetch order' };
  }
};

export const updateOrderStatus = async (id, status) => {
  try {
    const token = getAuthToken();
    const response = await axios.patch(
      `${import.meta.env.VITE_BASEURL}/orders/${id}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
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
    throw error.response?.data || { message: 'Failed to update order status' };
  }
}; 