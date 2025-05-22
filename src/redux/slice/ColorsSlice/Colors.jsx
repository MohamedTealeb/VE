import { createSlice } from "@reduxjs/toolkit";
import { fetchColors, addColor, updateColor, deleteColor } from "../../../Apis/Colors/Colors_Api";

const colorsSlice = createSlice({
  name: "colors",
  initialState: {
    colors: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetColorsState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Colors
      .addCase(fetchColors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchColors.fulfilled, (state, action) => {
        state.loading = false;
        state.colors = action.payload;
      })
      .addCase(fetchColors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Color
      .addCase(addColor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addColor.fulfilled, (state, action) => {
        state.loading = false;
        state.colors.push(action.payload);
      })
      .addCase(addColor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Color
      .addCase(updateColor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateColor.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.colors.findIndex(color => color.id === action.payload.id);
        if (index !== -1) {
          state.colors[index] = action.payload;
        }
      })
      .addCase(updateColor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Color
      .addCase(deleteColor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.loading = false;
        state.colors = state.colors.filter(color => color.id !== action.payload.id);
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetColorsState } = colorsSlice.actions;
export { addColor, updateColor as editColor, deleteColor as removeColor, fetchColors };
export default colorsSlice.reducer; 