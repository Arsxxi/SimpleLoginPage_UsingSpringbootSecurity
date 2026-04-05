import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
});

// Auto-attach JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const loginUser = (email: string, password: string) =>
  API.post("/auth/login", { email, password });

export const registerUser = (username: string, email: string, password: string) =>
  API.post("/auth/register", { username, email, password });

export const getMe = () => API.get("/auth/me");