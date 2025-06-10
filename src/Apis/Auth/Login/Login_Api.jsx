import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/auth/login`,
        {
          email,
          password,
        }
      );
      
      // Return the entire response data
      return response.data;
      
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);
