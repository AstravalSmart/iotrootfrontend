import React, { useState } from "react";
import api from "../api/api";
import LoginInput from "../components/Login/LoginInput";
import LoginButton from "../components/Login/LoginButton";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await api.post("/auth/register", { email, password });
        setMessage("Account created successfully! Please login.");
        setIsRegister(false);
      } else {
        const res = await api.post("/auth/login", { email, password });
        if (res.data.success) {
          onLoginSuccess(res.data.userId, email);
        } else {
          setMessage(res.data.message);
        }
      }
    } catch (err) {
      setMessage(err.response?.data || "Operation failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-400 mb-2">🌐 Welcome to IoTRoot</h1>
          <p className="text-gray-400">Connect to your IoT ecosystem</p>
        </div>
        
        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="text-3xl mr-3">
              {isRegister ? "👤" : "🔐"}
            </div>
            <h2 className="text-2xl font-bold text-white">
              {isRegister ? "Create Account" : "Welcome Back"}
            </h2>
          </div>

          {/* Input fields */}
          <LoginInput
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />

          {/* Submit button + toggle */}
          <LoginButton
            isRegister={isRegister}
            setIsRegister={setIsRegister}
            message={message}
          />
        </form>
        
        {/* Footer */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>Secure IoT data management platform</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
