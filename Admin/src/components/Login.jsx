import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/admin`, // Updated URL
        { email, password }
      );
      console.log("Response received:", response.data);
      if (response.data.success === true) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              className="rounded-md w-full px-3 py-2 outline-none border border-gray-300 focus:ring-2 focus:ring-gray-500"
              type="email"
              value={email}
              placeholder="your@email.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              className="rounded-md w-full px-3 py-2 outline-none border border-gray-300 focus:ring-2 focus:ring-gray-500"
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;