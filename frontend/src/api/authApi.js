import axios from "./axiosInstance";
const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

export const loginUser = (data) => {
  return API.post("/login", data);
};

export const registerUser = (data) => {
    return API.post('/register',data)
};
