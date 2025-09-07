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
        if (res.data === "Login success") {
          onLoginSuccess(email);
        } else {
          setMessage(res.data);
        }
      }
    } catch (err) {
      setMessage(err.response?.data || "Operation failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isRegister ? "Create Account" : "Login"}
        </h2>

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
    </div>
  );
};

export default Login;
