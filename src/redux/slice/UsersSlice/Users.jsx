import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllUsers,
  deleteUser
} from '../../../Apis/Users/Users';

// Async thunks
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllUsers();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeUser = createAsyncThunk(
  'users/removeUser',
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteUser(id);
      return { id, ...response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  users: [],
  loading: false,
  error: null,
  success: false
};

const usersSlice = createSlice({
  name: 'users',
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
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.success = true;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove User
      .addCase(removeUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user.id !== action.payload.id);
        state.success = true;
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearSuccess } = usersSlice.actions;
export default usersSlice.reducer;
