import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
} from '../../../Apis/Orders/Orders';

// Async thunks
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllOrders();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getOrder = createAsyncThunk(
  'orders/getOrder',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getOrderById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await updateOrderStatus(id, status);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteOrderById = createAsyncThunk(
  'orders/deleteOrder',
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteOrder(id);
      return { id, ...response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null,
  success: false
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.success = true;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Order
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
        state.success = true;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Status
      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        if (state.selectedOrder?.id === action.payload.id) {
          state.selectedOrder = action.payload;
        }
        state.success = true;
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Order
      .addCase(deleteOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(order => order.id !== action.payload.id);
        state.success = true;
      })
      .addCase(deleteOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearSuccess, clearSelectedOrder } = ordersSlice.actions;
export default ordersSlice.reducer; 