import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get all colors
export const fetchColors = createAsyncThunk(
  "colors/fetchColors",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_BASEURL}/colors`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch colors");
    }
  }
);

// Add new color
export const addColor = createAsyncThunk(
  "colors/addColor",
  async ({ name, hexCode }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/colors`,
        { name, hexCode },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add color");
    }
  }
);

// Update color
export const updateColor = createAsyncThunk(
  "colors/updateColor",
  async ({ id, name, hexCode }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${import.meta.env.VITE_BASEURL}/colors/${id}`,
        { name, hexCode },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update color");
    }
  }
);

// Delete color
export const deleteColor = createAsyncThunk(
  "colors/deleteColor",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `${import.meta.env.VITE_BASEURL}/colors/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete color");
    }
  }
); 