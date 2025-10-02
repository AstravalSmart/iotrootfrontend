import React from "react";

const LoginButton = ({ isRegister, setIsRegister, message }) => {
  const isSuccess = message && message.includes("successfully");
  
  return (
    <>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        <span className="flex items-center justify-center space-x-2">
          <span>{isRegister ? "✨ Create Account" : "🚀 Sign In"}</span>
        </span>
      </button>

      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
        </p>
        <button
          type="button"
          onClick={() => setIsRegister(!isRegister)}
          className="mt-2 text-blue-400 hover:text-blue-300 font-medium transition duration-200 hover:underline"
        >
          {isRegister ? "🔐 Sign In Instead" : "👤 Create New Account"}
        </button>
      </div>

      {message && (
        <div className={`mt-4 p-3 rounded-lg text-center text-sm ${
          isSuccess 
            ? 'bg-green-900 border border-green-700 text-green-300' 
            : 'bg-red-900 border border-red-700 text-red-300'
        }`}>
          <div className="flex items-center justify-center space-x-2">
            <span>{isSuccess ? "✅" : "⚠️"}</span>
            <span>{message}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginButton;
