import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const authApi = axios.create({
  baseURL: `${BASE_URL}/auth`,
});
