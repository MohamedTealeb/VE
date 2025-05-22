import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addAdmin = createAsyncThunk(
  "users/addAdmin",
  async ({ firstName, lastName, email, phoneNumber, password }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/users/admin`,
        {
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.response?.data || 
        "Failed to add admin"
      );
    }
  }
); 