import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ firstName, lastName, email, phoneNumber, password }, { rejectWithValue }) => {
    try {
      console.log("Attempting registration with:", { email, firstName, lastName });
      
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

      console.log("Registration response:", response.data);

      // Check if token exists in response
      const token = response.data.token || response.data.data?.token;
      
      if (token) {
        localStorage.setItem("token", token);
        console.log("Token stored in localStorage");
      }

      return {
        user: response.data.user || response.data.data?.user,
        token: token
      };
      
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.message || 
        error.response?.data || 
        "Registration failed"
      );
    }
  }
);
