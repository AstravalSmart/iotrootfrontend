import React from "react";

const LoginInput = ({ email, setEmail, password, setPassword }) => {
  return (
    <div className="space-y-4 mb-6">
      {/* Email input */}
      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          📧 Email Address
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          required
        />
      </div>

      {/* Password input */}
      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          🔒 Password
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          required
        />
      </div>
    </div>
  );
};

export default LoginInput;
