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

   
      
      // Check if token exists in response.data or response.data.data
      const token = response.data.token || response.data.data?.token;
      
      if (token) {
        localStorage.setItem("token", token);
      
        return {
          user: response.data.user || response.data.data?.user,
          token: token
        };
      } else {
        console.error("No token received in response. Full response:", response.data);
        return rejectWithValue("No token received in response");
      }
      
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);
