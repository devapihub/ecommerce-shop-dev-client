import axios from "axios";
import { refreshTokenService } from "./refreshTokenService";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': import.meta.env.VITE_API_KEY
  }
});

// Flag dùng để tránh gọi refresh nhiều lần cùng lúc
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// -------------------------------------------------
// REQUEST INTERCEPTOR: tự đính kèm access token
// -------------------------------------------------
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    
    if (token) {
      config.headers["authorization"] = token;
    }
    if (userId) {
      config.headers["x-client-id"] = userId;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// -------------------------------------------------
// RESPONSE INTERCEPTOR: tự refresh khi gặp 401
// -------------------------------------------------
api.interceptors.response.use(
  (response) => response,
  async (error) => {

    // Lấy request gốc chứa url, method, headers, data...
    const originalRequest = error.config;

    // Nếu lỗi không phải 401 -> trả về luôn
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Nếu đang refresh -> queue request lại
    if (isRefreshing) {
      return new Promise(function (resolve, reject) {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers["authorization"] = token;
        return api(originalRequest);
      }).catch(err => Promise.reject(err));
    }

    // Bắt đầu refresh
    isRefreshing = true;

    try {
      // Gọi refresh token service
      const { accessToken } = await refreshTokenService();

      // resume queue
      processQueue(null, accessToken);

      // gắn access token mới vào request cũ
      originalRequest.headers["authorization"] = accessToken;

      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);

      // refresh failed → logout user
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
