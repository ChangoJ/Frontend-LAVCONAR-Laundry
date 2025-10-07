import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const adminBranchOfficesApi = axios.create({
  baseURL: `${BASE_URL}/admin-branch-offices`,
});

// Interceptor para agregar el token de autorización
adminBranchOfficesApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
