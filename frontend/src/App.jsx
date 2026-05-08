import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

import AdminLogin from "./pages/admin/adminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

import PublicRoute from "./components/PublicRoute";

import ProtectedRoute from "./components/protectedRoute";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProfile } from "./redux/profileSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(fetchProfile(token));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <PublicRoute><Login /></PublicRoute>} />

        <Route path="/login" element={ <PublicRoute><Login /></PublicRoute>} />

        <Route path="/register" element={ <PublicRoute><Register /></PublicRoute>} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
