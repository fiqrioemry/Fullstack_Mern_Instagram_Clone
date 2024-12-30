import axios from "axios";
import Cookies from "js-cookie";

// Buat Axios Instance
export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken") || null;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config.__isRetryRequest
    ) {
      try {
        const response = await axios.post("/api/auth/refresh", {
          withCredentials: true,
        });
        const newAccessToken = response.data.data.accessToken;

        Cookies.set("accessToken", response.data.data.accessToken, {
          path: "/",
          secure: true,
          sameSite: "strict",
          expires: 1 / 48,
        });

        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(error.config); // Retry original request
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        window.location.href = "/signin";
      }
    }
    return Promise.reject(error);
  }
);
