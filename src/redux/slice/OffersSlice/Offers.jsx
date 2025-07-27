import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getAllOffers, 
  getOfferById, 
  createOffer, 
  updateOffer, 
  deleteOffer,
  getActiveOffers,
  getExpiredOffers
} from '../../../Apis/Offers/Offers';

// Async thunks
export const fetchOffers = createAsyncThunk(
  'offers/fetchOffers',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔍 Redux: Starting fetchOffers...');
      const response = await getAllOffers();
      console.log('🔍 Redux: fetchOffers success:', response);
      return response;
    } catch (error) {
      console.error('🔍 Redux: fetchOffers error:', error);
      return rejectWithValue({
        message: error.response?.data?.message || 'Failed to fetch offers',
        status: error.response?.status
      });
    }
  }
);

export const fetchOfferById = createAsyncThunk(
  'offers/fetchOfferById',
  async (offerId, { rejectWithValue }) => {
    try {
      const response = await getOfferById(offerId);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || 'Failed to fetch offer',
        status: error.response?.status
      });
    }
  }
);

export const createNewOffer = createAsyncThunk(
  'offers/createNewOffer',
  async (offerData, { rejectWithValue }) => {
    try {
      console.log('🔍 Redux: Starting createNewOffer...', offerData);
      const response = await createOffer(offerData);
      console.log('🔍 Redux: createNewOffer success:', response);
      return response;
    } catch (error) {
      console.error('🔍 Redux: createNewOffer error:', error);
      console.error('🔍 Redux: Error details:', {
        message: error?.message,
        response: error?.response,
        responseData: error?.response?.data,
        status: error?.response?.status,
        statusText: error?.response?.statusText
      });
      
      // طباعة تفاصيل أكثر
      console.error('🔍 Redux: Full error object:', JSON.stringify(error, null, 2));
      console.error('🔍 Redux: Error type:', typeof error);
      console.error('🔍 Redux: Error constructor:', error?.constructor?.name);
      
      return rejectWithValue({
        message: error.response?.data?.message || error?.message || 'Failed to create offer',
        status: error.response?.status
      });
    }
  }
);

export const updateExistingOffer = createAsyncThunk(
  'offers/updateExistingOffer',
  async ({ offerId, offerData }, { rejectWithValue }) => {
    try {
      console.log('🔍 Redux: Starting updateExistingOffer...', { offerId, offerData });
      const response = await updateOffer(offerId, offerData);
      console.log('🔍 Redux: updateExistingOffer success:', response);
      return response;
    } catch (error) {
      console.error('🔍 Redux: updateExistingOffer error:', error);
      console.error('🔍 Redux: Error details:', {
        message: error?.message,
        response: error?.response,
        responseData: error?.response?.data,
        status: error?.response?.status,
        statusText: error?.response?.statusText
      });
      
      // طباعة تفاصيل أكثر
      console.error('🔍 Redux: Full error object:', JSON.stringify(error, null, 2));
      console.error('🔍 Redux: Error type:', typeof error);
      console.error('🔍 Redux: Error constructor:', error?.constructor?.name);
      
      return rejectWithValue({
        message: error.response?.data?.message || error?.message || 'Failed to update offer',
        status: error.response?.status
      });
    }
  }
);

export const deleteOfferById = createAsyncThunk(
  'offers/deleteOfferById',
  async (offerId, { rejectWithValue }) => {
    try {
      await deleteOffer(offerId);
      return offerId;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || 'Failed to delete offer',
        status: error.response?.status
      });
    }
  }
);

export const fetchActiveOffers = createAsyncThunk(
  'offers/fetchActiveOffers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getActiveOffers();
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || 'Failed to fetch active offers',
        status: error.response?.status
      });
    }
  }
);

export const fetchExpiredOffers = createAsyncThunk(
  'offers/fetchExpiredOffers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getExpiredOffers();
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || 'Failed to fetch expired offers',
        status: error.response?.status
      });
    }
  }
);

// Initial state
const initialState = {
  offers: [],
  selectedOffer: null,
  loading: false,
  error: null,
  activeOffers: [],
  expiredOffers: []
};

// Slice
const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedOffer: (state) => {
      state.selectedOffer = null;
    },
    setSelectedOffer: (state, action) => {
      state.selectedOffer = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all offers
      .addCase(fetchOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch offer by ID
      .addCase(fetchOfferById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOfferById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOffer = action.payload;
      })
      .addCase(fetchOfferById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create new offer
      .addCase(createNewOffer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.offers.push(action.payload);
      })
      .addCase(createNewOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update offer
      .addCase(updateExistingOffer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExistingOffer.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.offers.findIndex(offer => offer.id === action.payload.id);
        if (index !== -1) {
          state.offers[index] = action.payload;
        }
        if (state.selectedOffer && state.selectedOffer.id === action.payload.id) {
          state.selectedOffer = action.payload;
        }
      })
      .addCase(updateExistingOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete offer
      .addCase(deleteOfferById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOfferById.fulfilled, (state, action) => {
        state.loading = false;
        state.offers = state.offers.filter(offer => offer.id !== action.payload);
        if (state.selectedOffer && state.selectedOffer.id === action.payload) {
          state.selectedOffer = null;
        }
      })
      .addCase(deleteOfferById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch active offers
      .addCase(fetchActiveOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.activeOffers = action.payload;
      })
      .addCase(fetchActiveOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch expired offers
      .addCase(fetchExpiredOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpiredOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.expiredOffers = action.payload;
      })
      .addCase(fetchExpiredOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearSelectedOffer, setSelectedOffer } = offersSlice.actions;
export default offersSlice.reducer; 