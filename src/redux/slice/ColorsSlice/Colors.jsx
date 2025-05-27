import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllColors,
  getColorById,
  createColor,
  updateColor,
  deleteColor
} from '../../../Apis/Colors/Colors';

// Async thunks
export const fetchColors = createAsyncThunk(
  'colors/fetchColors',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching colors in thunk...');
      const response = await getAllColors();
      console.log('Colors thunk response:', response);
      return response;
    } catch (error) {
      console.error('Colors thunk error:', error);
      return rejectWithValue(error);
    }
  }
);

export const addColor = createAsyncThunk(
  'colors/addColor',
  async (colorData, { rejectWithValue }) => {
    try {
      const response = await createColor(colorData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editColor = createAsyncThunk(
  'colors/editColor',
  async ({ id, colorData }, { rejectWithValue }) => {
    try {
      const response = await updateColor(id, colorData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeColor = createAsyncThunk(
  'colors/removeColor',
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteColor(id);
      return { id, ...response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  colors: [],
  loading: false,
  error: null,
  success: false
};

const colorsSlice = createSlice({
  name: 'colors',
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
      // Fetch Colors
      .addCase(fetchColors.pending, (state) => {
        console.log('Fetch colors pending...');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchColors.fulfilled, (state, action) => {
        console.log('Fetch colors fulfilled:', action.payload);
        state.loading = false;
        state.colors = action.payload.data || [];
        console.log('Updated colors state:', state.colors);
        state.success = true;
      })
      .addCase(fetchColors.rejected, (state, action) => {
        console.error('Fetch colors rejected:', action.payload);
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch colors';
      })
      // Add Color
      .addCase(addColor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addColor.fulfilled, (state, action) => {
        state.loading = false;
        state.colors.push(action.payload.data || action.payload);
        state.success = true;
      })
      .addCase(addColor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to add color';
      })
      // Edit Color
      .addCase(editColor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editColor.fulfilled, (state, action) => {
        state.loading = false;
        const colorData = action.payload.data || action.payload;
        const index = state.colors.findIndex(color => color.id === colorData.id);
        if (index !== -1) {
          state.colors[index] = colorData;
        }
        state.success = true;
      })
      .addCase(editColor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update color';
      })
      // Remove Color
      .addCase(removeColor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeColor.fulfilled, (state, action) => {
        state.loading = false;
        state.colors = state.colors.filter(color => color.id !== action.payload.id);
        state.success = true;
      })
      .addCase(removeColor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete color';
      });
  }
});

export const { clearError, clearSuccess } = colorsSlice.actions;
export default colorsSlice.reducer; 