import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/authSlice";
import { loginUser } from "../api/authApi";
import { fetchProfile } from "../redux/profileSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
  const newErrors = {};

  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!trimmedEmail) {
    newErrors.email = "Email is required";
  } else if (!emailRegex.test(trimmedEmail)) {
    newErrors.email = "Enter a valid email";
  }

  if (!trimmedPassword) {
    newErrors.password = "Password is required";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};


  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const response = await loginUser({
        email,
        password,
      });

      const token = response.data.token;

      dispatch(loginSuccess(response.data));

     localStorage.setItem("token", token); 

      await dispatch(fetchProfile(token));

      navigate("/home",{replace:true});
    } catch (error) {
  const message =
    error.response?.data?.message || "Login failed";

  setErrors({ general: message });
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">User Login</h1>

        <div className="flex flex-col gap-4">

          
          <div>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded-md w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>

          {errors.general && (
            <p className="text-red-500 text-sm text-center">
              {errors.general}
            </p>
          )}

          <p className="text-center text-sm mt-4">
            Don't have an account?
            <span
              onClick={() => navigate("/register")}
              className="text-blue-500 cursor-pointer ml-1 hover:underline"
            >
              Register
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;