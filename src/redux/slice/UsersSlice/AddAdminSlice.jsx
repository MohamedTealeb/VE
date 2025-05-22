import { createSlice } from "@reduxjs/toolkit";
import { addAdmin } from "../../../Apis/Auth/AddAdmin/AddAdmin_Api";

const addAdminSlice = createSlice({
  name: "addAdmin",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetAddAdminState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addAdmin.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(addAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetAddAdminState } = addAdminSlice.actions;
export default addAdminSlice.reducer; 