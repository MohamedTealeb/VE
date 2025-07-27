import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.ryo-egypt.com';

// Get all offers
export const getAllOffers = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('🔍 API: getAllOffers called');
    console.log('🔍 API: URL:', `${API_BASE_URL}/api/offers`);
    console.log('🔍 API: Token present:', !!token);
    
    const response = await axios.get(`${API_BASE_URL}/api/offers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('🔍 API: getAllOffers success:', response.data);
    
    // Handle the new response structure
    if (response.data && response.data.offers) {
      console.log('🔍 API: Extracting offers from response.data.offers');
      return response.data.offers;
    } else if (Array.isArray(response.data)) {
      console.log('🔍 API: Response is already an array');
      return response.data;
    } else {
      console.log('🔍 API: Unexpected response structure:', response.data);
      return [];
    }
  } catch (error) {
    console.error('🔍 API: getAllOffers error:', error);
    // Fallback to messages API if offers API is not available
    if (error.code === 'ERR_NETWORK' || error.response?.status === 404) {
      console.log('🔍 API: Offers API not available, falling back to messages API');
      const messagesResponse = await axios.get(`${API_BASE_URL}/api/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('🔍 API: Messages fallback success:', messagesResponse.data);
      // Filter messages that have offer fields
      const filteredOffers = messagesResponse.data.filter(message => 
        message.title && message.discount && message.expiresAt
      );
      console.log('🔍 API: Filtered offers from messages:', filteredOffers);
      return filteredOffers;
    }
    throw error;
  }
};

// Get offer by ID
export const getOfferById = async (offerId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}/api/offers/${offerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Get offer by ID error:', error);
    throw error;
  }
};

// Create new offer
export const createOffer = async (offerData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_BASE_URL}/api/offers`, offerData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Create offer error:', error);
    console.error('Create offer error details:', {
      message: error?.message,
      response: error?.response,
      responseData: error?.response?.data,
      status: error?.response?.status,
      statusText: error?.response?.statusText
    });
    
    // Fallback to messages API if offers API is not available
    if (error.code === 'ERR_NETWORK' || error.response?.status === 404) {
      console.log('Offers API not available, falling back to messages API');
      const messagesResponse = await axios.post(`${API_BASE_URL}/api/messages`, offerData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return messagesResponse.data;
    }
    if (error.response) {
      console.error('Error response:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers
      });
    }
    
    // طباعة تفاصيل أكثر
    console.error('Full error object:', JSON.stringify(error, null, 2));
    console.error('Error type:', typeof error);
    console.error('Error constructor:', error?.constructor?.name);
    
    throw error;
  }
};

// Update offer
export const updateOffer = async (offerId, offerData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.patch(`${API_BASE_URL}/api/offers/${offerId}`, offerData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Update offer error:', error);
    console.error('Update offer error details:', {
      message: error?.message,
      response: error?.response,
      responseData: error?.response?.data,
      status: error?.response?.status,
      statusText: error?.response?.statusText
    });
    
    // Fallback to messages API if offers API is not available
    if (error.code === 'ERR_NETWORK' || error.response?.status === 404) {
      console.log('Offers API not available, falling back to messages API');
      const messagesResponse = await axios.put(`${API_BASE_URL}/api/messages/${offerId}`, offerData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return messagesResponse.data;
    }
    if (error.response) {
      console.error('Error response:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers
      });
    }
    
    // طباعة تفاصيل أكثر
    console.error('Full error object:', JSON.stringify(error, null, 2));
    console.error('Error type:', typeof error);
    console.error('Error constructor:', error?.constructor?.name);
    
    throw error;
  }
};

// Delete offer
export const deleteOffer = async (offerId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_BASE_URL}/api/offers/${offerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Delete offer error:', error);
    // Fallback to messages API if offers API is not available
    if (error.code === 'ERR_NETWORK' || error.response?.status === 404) {
      console.log('Offers API not available, falling back to messages API');
      const messagesResponse = await axios.delete(`${API_BASE_URL}/api/messages/${offerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return messagesResponse.data;
    }
    throw error;
  }
};

// Get active offers
export const getActiveOffers = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}/api/offers/active`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Get active offers error:', error);
    throw error;
  }
};

// Get expired offers
export const getExpiredOffers = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}/api/offers/expired`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Get expired offers error:', error);
    throw error;
  }
}; 