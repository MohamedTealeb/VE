import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BASEURL}`;

// Create a new government
export const createGovernment = async (data, token) => {
  return axios.post(`${BASE_URL}/governments`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Get all governments
export const getAllGovernments = async (token) => {
  return axios.get(`${BASE_URL}/governments`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Get a single government by ID
export const getGovernmentById = async (id, token) => {
  return axios.get(`${BASE_URL}/governments/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Update a government
export const updateGovernment = async (id, data, token) => {
  return axios.put(`${BASE_URL}/governments/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Delete a government
export const deleteGovernment = async (id, token) => {
  return axios.delete(`${BASE_URL}/governments/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
