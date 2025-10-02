import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ userId, email, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();         // reset App state
    navigate("/");      // navigate to login page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome, {email}!</h1>
        <p className="text-gray-600 mb-2">User ID: {userId}</p>
        <p className="text-lg mb-6">This is your dashboard.</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
