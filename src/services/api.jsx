import axios from "axios";
import { redirectToLogin } from "../utils/navigate";

const trimTrailingSlash = (url = "") => url.replace(/\/+$/, "");

// Local CRA: use same-origin /api (setupProxy.js) to bypass API CORS.
// Production build: use REACT_APP_API_BASE_URL.
const apiBaseUrl =
  process.env.NODE_ENV === "development"
    ? "/api/v1/super"
    : trimTrailingSlash(
        process.env.REACT_APP_API_BASE_URL ||
          "https://salesammo-api.girafdev.com/api/v1/super"
      );

const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 90000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const url = config.url || "";
    const isAuthRoute =
      url.includes("/auth/login") ||
      url.includes("/auth/register") ||
      url.includes("/auth/forgot-password") ||
      url.includes("/auth/reset-password");

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && !isAuthRoute) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || "";
    const isAuthRoute =
      url.includes("/auth/login") ||
      url.includes("/auth/register") ||
      url.includes("/auth/forgot-password") ||
      url.includes("/auth/reset-password");

    if (status === 401 && !isAuthRoute) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      redirectToLogin();
    }
    return Promise.reject(error);
  }
);

export default api;
