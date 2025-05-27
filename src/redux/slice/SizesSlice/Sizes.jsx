import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllSizes,
  getSizeById,
  createSize,
  updateSize,
  deleteSize
} from '../../../Apis/Sizes/Sizes';

// Async thunks
export const fetchSizes = createAsyncThunk(
  'sizes/fetchSizes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllSizes();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addSize = createAsyncThunk(
  'sizes/addSize',
  async (sizeData, { rejectWithValue }) => {
    try {
      const response = await createSize(sizeData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editSize = createAsyncThunk(
  'sizes/editSize',
  async ({ id, sizeData }, { rejectWithValue }) => {
    try {
      const response = await updateSize(id, sizeData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeSize = createAsyncThunk(
  'sizes/removeSize',
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteSize(id);
      return { id, ...response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  sizes: [],
  loading: false,
  error: null,
  success: false
};

const sizesSlice = createSlice({
  name: 'sizes',
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
      // Fetch Sizes
      .addCase(fetchSizes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSizes.fulfilled, (state, action) => {
        state.loading = false;
        state.sizes = action.payload;
        state.success = true;
      })
      .addCase(fetchSizes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch sizes';
      })
      // Add Size
      .addCase(addSize.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSize.fulfilled, (state, action) => {
        state.loading = false;
        state.sizes.push(action.payload);
        state.success = true;
      })
      .addCase(addSize.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to add size';
      })
      // Edit Size
      .addCase(editSize.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editSize.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.sizes.findIndex(size => size.id === action.payload.id);
        if (index !== -1) {
          state.sizes[index] = action.payload;
        }
        state.success = true;
      })
      .addCase(editSize.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update size';
      })
      // Remove Size
      .addCase(removeSize.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeSize.fulfilled, (state, action) => {
        state.loading = false;
        state.sizes = state.sizes.filter(size => size.id !== action.payload.id);
        state.success = true;
      })
      .addCase(removeSize.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete size';
      });
  }
});

export const { clearError, clearSuccess } = sizesSlice.actions;
export default sizesSlice.reducer; 