import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllMessages,
  getMessageById,
  createMessage,
  deleteMessage,
  createOffer
} from '../../../Apis/Messages/Messages';

// Async thunks
export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await getAllMessages(filters);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getMessage = createAsyncThunk(
  'messages/getMessage',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getMessageById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createNewMessage = createAsyncThunk(
  'messages/createMessage',
  async (data, { rejectWithValue }) => {
    try {
      console.log('Creating new message with data:', data);
      const response = await createMessage(data);
      console.log('Create message response:', response);
      return response;
    } catch (error) {
      console.error('Create message thunk error:', error);
      return rejectWithValue(error);
    }
  }
);

export const createNewOffer = createAsyncThunk(
  'messages/createOffer',
  async (data, { rejectWithValue }) => {
    try {
      console.log('Creating new offer with data:', data);
      const response = await createOffer(data);
      console.log('Create offer response:', response);
      return response;
    } catch (error) {
      console.error('Create offer thunk error:', error);
      console.error('Error details in thunk:', {
        message: error?.message,
        response: error?.response,
        data: error?.response?.data,
        status: error?.response?.status
      });
      return rejectWithValue(error);
    }
  }
);

export const deleteMessageById = createAsyncThunk(
  'messages/deleteMessage',
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteMessage(id);
      return { id, ...response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  messages: [],
  selectedMessage: null,
  loading: false,
  error: null,
  success: false
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    clearSelectedMessage: (state) => {
      state.selectedMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Messages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        console.log('fetchMessages.fulfilled - action.payload:', action.payload, 'Type:', typeof action.payload, 'Is Array:', Array.isArray(action.payload));
        // Extract the messages array from the response
        state.messages = action.payload?.messages || action.payload || [];
        console.log('State messages after setting:', state.messages);
        state.success = true;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Message
      .addCase(getMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMessage = action.payload;
        state.success = true;
      })
      .addCase(getMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Message
      .addCase(createNewMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewMessage.fulfilled, (state, action) => {
        state.loading = false;
        console.log('createNewMessage.fulfilled - action.payload:', action.payload);
        
        // Handle different response structures
        const newMessage = action.payload?.message || action.payload;
        if (newMessage) {
          state.messages.unshift(newMessage);
        }
        
        state.success = true;
      })
      .addCase(createNewMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Offer
      .addCase(createNewOffer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewOffer.fulfilled, (state, action) => {
        state.loading = false;
        console.log('createNewOffer.fulfilled - action.payload:', action.payload);
        
        // Handle different response structures
        const newOffer = action.payload?.offer || action.payload;
        if (newOffer) {
          state.messages.unshift(newOffer);
        }
        
        state.success = true;
      })
      .addCase(createNewOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Message
      .addCase(deleteMessageById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMessageById.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = state.messages.filter(message => message.id !== action.payload.id);
        state.success = true;
      })
      .addCase(deleteMessageById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearSuccess, clearSelectedMessage } = messagesSlice.actions;
export default messagesSlice.reducer; 