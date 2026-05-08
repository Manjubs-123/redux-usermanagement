import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message;

    if (message === "User not found") {
      localStorage.removeItem("token");

      alert("Your account has been removed");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;