import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { clearProfile } from "../redux/profileSlice";

const Home = () => {
  const user = useSelector((state) => state.profile.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearProfile());

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">


      <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-md text-center">
    

        <h2 className="text-3xl font-bold mb-4">
          Home Page
        </h2>

        <p className="text-lg mb-6">
          Welcome <span className="font-semibold">{user?.name || "User"}</span>
        </p>

        <div className="flex justify-center gap-4">

          <button
            onClick={() => navigate("/profile")}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Go to Profile
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
};

export default Home;