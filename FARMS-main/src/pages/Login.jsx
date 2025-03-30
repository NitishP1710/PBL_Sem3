import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Login({ setUserType }) {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState("teacher");
  const [flipping, setFlipping] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const expectedRole = activeForm; // 'teacher' or 'student'

    try {
      const res = await fetch("http://localhost:5008/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      
      if (res.ok) {
        // Verify the role matches the form they're logging in from
        if (data.user.role !== expectedRole) {
          throw new Error(`Please use the ${data.user.role} login form`);
        }
        
        // Store authentication data
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userType", data.user.role);
        localStorage.setItem("userData", JSON.stringify(data.user));
        setUserType(data.user.role);
        
        // Redirect to appropriate dashboard
        navigate(`/${data.user.role}Dashboard`);
      } else {
        throw new Error(data.error || "Invalid credentials");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleForm = () => {
    setError(null);
    setFlipping(true);
    setTimeout(() => {
      setActiveForm(activeForm === "teacher" ? "student" : "teacher");
      setFlipping(false);
    }, 300);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-purple-100">
      <div className="relative w-96 h-[420px] perspective-1000">
        <AnimatePresence mode="wait">
          {!flipping && (
            <motion.div
              key={activeForm}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute w-full h-full backface-hidden"
            >
              <motion.div
                className="bg-white shadow-2xl rounded-2xl p-6 h-full"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h1 className={`text-2xl font-bold ${
                    activeForm === "teacher" 
                      ? "text-purple-700" 
                      : "text-blue-600"
                  }`}>
                    {activeForm === "teacher" 
                      ? "Teacher Login" 
                      : "Student Login"}
                  </h1>
                  <button
                    onClick={toggleForm}
                    className={`text-sm ${
                      activeForm === "teacher" 
                        ? "text-purple-600 hover:text-purple-800" 
                        : "text-blue-600 hover:text-blue-800"
                    } transition-colors`}
                  >
                    Switch to {activeForm === "teacher" ? "Student" : "Teacher"}
                  </button>
                </div>
                
                {error && (
                  <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <motion.input
                      type="text"
                      name="username"
                      placeholder="Username"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                      whileFocus={{ scale: 1.01 }}
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <motion.input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                      whileFocus={{ scale: 1.01 }}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className={`w-full py-3 bg-gradient-to-r ${
                      activeForm === "teacher"
                        ? "from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                        : "from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    } text-white rounded-lg transition-all`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Login as {activeForm === "teacher" ? "Teacher" : "Student"}
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}