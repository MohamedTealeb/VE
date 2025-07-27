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
    // Log the complete request configuration
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data
    });
    return config;
  },
  (error) => {
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to log responses
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });
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
    // Create FormData for file uploads
    const formData = new FormData();
    
    // Log the incoming product data
    console.log('Create Product - Raw data:', {
      ...productData,
      colors: productData.colors,
      sizes: productData.sizes,
      cover_Image: productData.cover_Image ? 'File present' : 'No file',
      images: productData.images?.length ? `${productData.images.length} files present` : 'No files'
    });
    
    // Add all product data to FormData
    Object.keys(productData).forEach(key => {
      if (key === 'cover_Image' && productData[key]) {
        formData.append('cover_Image', productData[key]);
      } else if (key === 'images' && Array.isArray(productData[key])) {
        productData[key].forEach((file, index) => {
          formData.append(`images`, file);
        });
      } else if (key === 'colors' || key === 'sizes') {
        // Send array of IDs as comma-separated string
        const value = Array.isArray(productData[key]) ? productData[key].join(',') : productData[key];
        formData.append(key, value);
      } else if (key === 'description') {
        // Map description to discreption for API compatibility
        formData.append('discreption', productData[key] || '');
      } else if (key === 'material') {
        // Ensure material is never undefined
        formData.append(key, productData[key] || '');
      } else {
        formData.append(key, productData[key]);
      }
    });

    // Log the FormData contents
    console.log('Create Product - FormData contents:');
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    // Make the API request
    const response = await api.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    console.log('Create Product - API Response:', response.data);
    return response.data;
  } catch (error) {
    // Log detailed error information
    console.error('Create Product - Error Details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      request: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
        data: error.config?.data
      }
    });

    // If there's a specific error message from the server, use it
    if (error.response?.data?.error) {
      throw error.response.data.error;
    }
    
    // Otherwise throw a generic error
    throw 'Failed to create product. Please try again.';
  }
};

// Update product
export const updateProduct = async (id, productData) => {
  try {
    // Validate input parameters
    if (!id) {
      throw new Error('Product ID is required');
    }
    if (!productData || typeof productData !== 'object') {
      throw new Error('Product data is required and must be an object');
    }

    // Log the incoming parameters
    console.log('Update Product - Parameters:', {
      id,
      productData
    });

    // Log the incoming product data
    console.log('Update Product - Raw data:', {
      id,
      ...productData,
      colors: productData.colors || [],
      sizes: productData.sizes || [],
      cover_Image: productData.cover_Image ? 'File present' : 'No file',
      images: productData.images?.length ? `${productData.images.length} files present` : 'No files'
    });

    // Prepare data for backend (only send fields that are actually provided)
    const updateData = {};

    // Only add fields that are provided and not empty
    if (productData.name !== undefined && productData.name !== '') {
      updateData.name = productData.name;
    }

    if (productData.description !== undefined && productData.description !== '') {
      updateData.discreption = productData.description;
    } else if (productData.discreption !== undefined && productData.discreption !== '') {
      updateData.discreption = productData.discreption;
    }

    if (productData.price !== undefined && productData.price !== '') {
      updateData.price = parseFloat(productData.price);
    }

    if (productData.stock !== undefined && productData.stock !== '') {
      updateData.stock = parseInt(productData.stock);
    }

    if (productData.target_gender !== undefined && productData.target_gender !== '') {
      updateData.target_gender = productData.target_gender;
    }

    if (productData.material !== undefined && productData.material !== '') {
      updateData.Material = productData.material;
    } else if (productData.Material !== undefined && productData.Material !== '') {
      updateData.Material = productData.Material;
    }

    // Add categoryId only if it's provided and valid
    if (productData.categoryId !== undefined && productData.categoryId !== '' && !isNaN(parseInt(productData.categoryId))) {
      updateData.categoryId = parseInt(productData.categoryId);
    }

    console.log('Update Product - Prepared data:', updateData);
    console.log('Update Product - categoryId value:', productData.categoryId);
    console.log('Update Product - categoryId type:', typeof productData.categoryId);

    // Make the API request
    const response = await api.patch(`/products/${id}`, updateData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Update Product - API Response:', response.data);
    return response.data;
  } catch (error) {
    // Log detailed error information
    console.error('Update Product - Error Details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      request: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
        data: error.config?.data
      }
    });

    // If there's a specific error message from the server, use it
    if (error.response?.data?.error) {
      throw error.response.data.error;
    }
    
    // Otherwise throw a generic error
    throw error.message || 'Failed to update product. Please try again.';
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    console.log('Attempting to delete product:', id);
    
    // First, remove color associations by updating the product with empty color array
    try {
      await api.put(`/products/${id}`, {
        colors: []
      });
      console.log('Successfully removed color associations');
    } catch (updateError) {
      console.warn('Error removing color associations:', updateError);
      // Continue with product deletion even if color removal fails
    }
    
    // Then delete the product
    const response = await api.delete(`/products/${id}`);
    console.log('Delete product response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Delete product error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      request: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
        params: error.config?.params
      }
    });
    
    // If there's a specific error message from the server, use it
    if (error.response?.data?.error) {
      throw error.response.data.error;
    }
    
    // If there's a specific error message in the response data, use it
    if (error.response?.data?.message) {
      throw error.response.data.message;
    }
    
    // Otherwise throw a generic error with status code
    throw {
      message: `Failed to delete product (${error.response?.status || 'Unknown error'})`,
      status: error.response?.status
    };
  }
}; 