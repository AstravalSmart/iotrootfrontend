import React from "react";

const LoginButton = ({ isRegister, setIsRegister, message }) => {
  return (
    <>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        {isRegister ? "Register" : "Login"}
      </button>

      <p className="mt-4 text-center text-sm text-gray-600">
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <span
          onClick={() => setIsRegister(!isRegister)}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          {isRegister ? "Login" : "Create Account"}
        </span>
      </p>

      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </>
  );
};

export default LoginButton;
