import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../../../Apis/Products/Products';

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllProducts();
      // Return the data array from the response
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await createProduct(productData);
      return response;
    } catch (error) {
      // If error is a string, use it directly
      if (typeof error === 'string') {
        return rejectWithValue(error);
      }
      // If error has a response with error message, use that
      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      }
      // Otherwise use a generic error message
      return rejectWithValue('Failed to create product. Please try again.');
    }
  }
);

export const editProduct = createAsyncThunk(
  'products/editProduct',
  async ({ id, ...productData }, { rejectWithValue }) => {
    try {
      console.log('🔍 editProduct thunk called with:', { id, productData });
      const response = await updateProduct(id, productData);
      console.log('🔍 editProduct response:', response);
      return response;
    } catch (error) {
      console.error('🔍 editProduct error:', error);
      return rejectWithValue(error);
    }
  }
);

export const removeProduct = createAsyncThunk(
  'products/removeProduct',
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteProduct(id);
      return { id, ...response };
    } catch (error) {
      console.error('Remove product thunk error:', error);
      
      // If error is a string, use it directly
      if (typeof error === 'string') {
        return rejectWithValue(error);
      }
      
      // If error has a message property, use it
      if (error.message) {
        return rejectWithValue(error.message);
      }
      
      // If error has a response with error message, use that
      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      }
      
      // If error has a response with message, use that
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      
      // Otherwise use a generic error message
      return rejectWithValue('Failed to delete product. Please try again.');
    }
  }
);

const initialState = {
  products: [],
  loading: false,
  error: null,
  success: false
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        // Store the array of products directly
        state.products = action.payload;
        state.success = true;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch products';
      })
      // Add Product
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
        state.success = true;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add product';
      })
      // Edit Product
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(product => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.success = true;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update product';
      })
      // Remove Product
      .addCase(removeProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(product => product.id !== action.payload.id);
        state.success = true;
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete product';
      });
  }
});

export const { clearError, clearSuccess } = productsSlice.actions;
export default productsSlice.reducer; 