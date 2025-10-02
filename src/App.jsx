import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Optional: persist login across page reload
  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    const storedEmail = sessionStorage.getItem("userEmail");
    if (storedUserId && storedEmail) {
      setUserId(storedUserId);
      setUserEmail(storedEmail);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = (userId, email) => {
    if (!isLoggedIn) {
      setUserId(userId);
      setUserEmail(email);
      setIsLoggedIn(true);
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("userEmail", email);
    } else {
      alert("You are already logged in!");
    }
  };

  const handleLogout = () => {
    setUserId("");
    setUserEmail("");
    setIsLoggedIn(false);
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userEmail");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard userId={userId} email={userEmail} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
