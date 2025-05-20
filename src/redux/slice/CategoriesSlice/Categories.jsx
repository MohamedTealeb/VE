import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '../../../Apis/Categories/Categories';

// Async thunks
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllCategories();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await createCategory(categoryData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editCategory = createAsyncThunk(
  'categories/editCategory',
  async ({ id, categoryData }, { rejectWithValue }) => {
    try {
      const response = await updateCategory(id, categoryData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeCategory = createAsyncThunk(
  'categories/removeCategory',
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteCategory(id);
      return { id, ...response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  categories: [],
  loading: false,
  error: null,
  success: false
};

const categoriesSlice = createSlice({
  name: 'categories',
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
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.success = true;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Category
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
        state.success = true;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Edit Category
      .addCase(editCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(cat => cat.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
        state.success = true;
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove Category
      .addCase(removeCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(cat => cat.id !== action.payload.id);
        state.success = true;
      })
      .addCase(removeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearSuccess } = categoriesSlice.actions;
export default categoriesSlice.reducer;