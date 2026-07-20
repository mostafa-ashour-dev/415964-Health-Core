import axios from "axios";
import { logout, setToken } from "../state/actions/auth.actions";
import useAuth from "../state/store";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use((config) => {
  const excludedRoutes = ["/auth/login", "/auth/register", "/auth/refresh"];
  if (excludedRoutes.includes(config.url || "")) return config;

  const { data } = useAuth.getState();
  const accessToken = data?.token;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { dispatch } = useAuth.getState();

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            // FIX 1: Safely apply the token to the queued requests
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/refresh`,
          { withCredentials: true },
        );

        const newAccessToken = response?.data?.data?.token;

        if (!newAccessToken) {
          throw new Error("No token returned");
        }

        dispatch(setToken(newAccessToken));
        processQueue(null, newAccessToken);

        // FIX 2: Fully overwrite/assign the Authorization header for Axios retry mechanism
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        dispatch(logout());
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
