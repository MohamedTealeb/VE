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
      
      const token = response.data.token || response.data.data?.token;
      
      if (token) {
        localStorage.setItem("token", token);
        return {
          user: response.data.user || response.data.data?.user,
          token: token
        };
      }
      
      return rejectWithValue("No token received in response");
      
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);
