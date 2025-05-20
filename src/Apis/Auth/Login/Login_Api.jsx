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


      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
      }

      return response.data;
      
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);
