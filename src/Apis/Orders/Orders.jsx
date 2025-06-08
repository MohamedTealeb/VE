import axios from 'axios';

const getAuthToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  return token;
};

export const getAllOrders = async (filters = {}) => {
  try {
    const token = getAuthToken();
    const params = new URLSearchParams();
    if (filters.userId) params.append('userId', filters.userId);
    if (filters.productId) params.append('productId', filters.productId);

    const response = await axios.get(
      `${import.meta.env.VITE_BASEURL}/orders?${params.toString()}`,
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
    console.log('Updating order status:', { id, status }); // Debug log
    const response = await axios.put(
      `${import.meta.env.VITE_BASEURL}/orders/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('Update response:', response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error('Update error:', error.response?.data || error); // Debug log
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

export const deleteOrder = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axios.delete(
      `${import.meta.env.VITE_BASEURL}/orders/${id}`,
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
    throw error.response?.data || { message: 'Failed to delete order' };
  }
}; 