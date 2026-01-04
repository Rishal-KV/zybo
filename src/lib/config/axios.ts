import axios, { AxiosError, AxiosInstance } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // enable if using cookies
});


// ✅ Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Attach token (client-side only)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// ✅ Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    const status = error.response?.status;

    // Global error handling
    if (status === 401) {
      console.error("Unauthorized – redirect to login");
      // window.location.href = "/login";
    }

    if (status === 500) {
      console.error("Server error");
    }

    return Promise.reject({
      message:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong",
      status,
    });
  }
);

export default axiosInstance;
