import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Optional: persist login across page reload
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = (email) => {
    if (!isLoggedIn) {           // allow login only if not already logged in
      setUserEmail(email);
      setIsLoggedIn(true);
      sessionStorage.setItem("userEmail", email); // persist login for session
    } else {
      alert("You are already logged in!");
    }
  };

  const handleLogout = () => {
    setUserEmail("");
    setIsLoggedIn(false);
    sessionStorage.removeItem("userEmail"); // clear session
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
              <Dashboard email={userEmail} onLogout={handleLogout} />
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
