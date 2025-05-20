import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ firstName, lastName, email, phoneNumber, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/auth/register`,
        {
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
        }
      );

      const token = response.data.token || response.data.data?.token;
      
      if (token) {
        localStorage.setItem("token", token);
      }

      return {
        user: response.data.user || response.data.data?.user,
        token: token
      };
      
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.response?.data || 
        "Registration failed"
      );
    }
  }
);
