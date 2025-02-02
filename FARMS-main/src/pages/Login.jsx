import React, { useState } from "react";
import Home from "./Home";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [activeTab, setActiveTab] = useState("login");
  const navigate=useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-black to-purple-200">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-96">
        <h1 className="text-2xl font-bold text-center mb-4">
          {activeTab === "login" ? "Login Form" : "Signup Form"}
        </h1>
        <div className="flex justify-center mb-6">
          <button
            className={`py-2 px-4 rounded-l-full ${
              activeTab === "login"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`py-2 px-4 rounded-r-full ${
              activeTab === "signup"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            Signup
          </button>
        </div>

        {activeTab === "login" ? (
          <form>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4 text-right">
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>
            <button onClick={()=>{navigate("/home")}} className="w-full py-2 bg-blue-500 text-white rounded-lg">
              Login
            </button>
            <p className="text-center text-sm mt-4">
              Not a member?{" "}
              <a
                href="#"
                className="text-blue-500 font-medium hover:underline"
                onClick={() => setActiveTab("signup")}
              >
                Signup now
              </a>
            </p>
          </form>
        ) : (
          <form>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <button className="w-full py-2 bg-blue-500 text-white rounded-lg">
              Signup
            </button>
          </form>
        )}
      </div>
    </div>
  );
}