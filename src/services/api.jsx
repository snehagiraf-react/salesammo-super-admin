import axios from "axios";
import { redirectToLogin } from "../utils/navigate";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      redirectToLogin();
    }
    return Promise.reject(error);
  },
);

export default api;
