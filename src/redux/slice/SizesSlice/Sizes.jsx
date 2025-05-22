import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllSizes, createSize, updateSize, deleteSize } from '../../../Apis/Sizes/Sizes';

// Async thunks
export const fetchSizes = createAsyncThunk(
  'sizes/fetchSizes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllSizes();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
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
      return rejectWithValue(error.message);
    }
  }
);

export const editSize = createAsyncThunk(
  'sizes/editSize',
  async (sizeData, { rejectWithValue }) => {
    try {
      const response = await updateSize(sizeData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeSize = createAsyncThunk(
  'sizes/removeSize',
  async (id, { rejectWithValue }) => {
    try {
      await deleteSize(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
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
      // Fetch sizes
      .addCase(fetchSizes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSizes.fulfilled, (state, action) => {
        state.loading = false;
        state.sizes = action.payload;
      })
      .addCase(fetchSizes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add size
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
        state.error = action.payload;
      })
      // Edit size
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
        state.error = action.payload;
      })
      // Remove size
      .addCase(removeSize.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeSize.fulfilled, (state, action) => {
        state.loading = false;
        state.sizes = state.sizes.filter(size => size.id !== action.payload);
        state.success = true;
      })
      .addCase(removeSize.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearSuccess } = sizesSlice.actions;
export default sizesSlice.reducer; 