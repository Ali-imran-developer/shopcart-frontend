import axios from "axios";
import AuthController from "@/controllers/authController";
export const APP_BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

export const apiClient = axios.create({
  baseURL: APP_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const { token } = AuthController.get();
    if (token && !config.headers.Authorization) {
      config.headers[`Authorization`] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      console.log("@statusstatus", error.response.data.message, status);
      if (
        error.response.data.message === "Unauthorized: User not found" &&
        status === 401
      ) {
        console.log("Unauthorized! Logging out...");
        AuthController.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
