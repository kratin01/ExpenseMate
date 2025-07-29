
// client/src/api/axiosConfig.js
// This file configures Axios for API requests, including setting the base URL and adding JWT tokens to requests.
// It ensures that all API calls are authenticated if a token is present.

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Add JWT to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
