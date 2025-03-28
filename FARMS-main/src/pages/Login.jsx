import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Login({ setUserType }) {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState("teacher");
  const [flipping, setFlipping] = useState(false);

  const handleTeacherLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const role=e.target.role.value;

    if (role==="teacher") {
      // Store authentication data
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userType", "teacher");
      setUserType("teacher");
      navigate("/teacherDashboard");
    } else {
      alert("Invalid teacher credentials.");
    }
  };

  const handleStudentLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const res = await fetch("http://localhost:5008/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, userType: "student" }),
      });

      const data = await res.json();
      if (res.ok) {
        // Store authentication data
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userType", "student");
        setUserType("student");
        navigate("/studentDashboard");
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Error logging in.");
    }
  };

  const toggleForm = () => {
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
              {activeForm === "teacher" ? (
                <motion.div
                  className="bg-white shadow-2xl rounded-2xl p-6 h-full"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-purple-700">
                      Teacher Login
                    </h1>
                    <button
                      onClick={toggleForm}
                      className="text-sm text-purple-600 hover:text-purple-800 transition-colors"
                    >
                      Switch to Student
                    </button>
                  </div>
                  <form onSubmit={handleTeacherLogin}>
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
                    <div className="mb-6">
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Role
                      </label>
                      <motion.input
                        type="text"
                        name="role"
                        placeholder="teacher/student"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                        whileFocus={{ scale: 1.01 }}
                      />
                    </div>
                    <motion.button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Login as Teacher
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  className="bg-white shadow-2xl rounded-2xl p-6 h-full"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-blue-600">
                      Student Login
                    </h1>
                    <button
                      onClick={toggleForm}
                      className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Switch to Teacher
                    </button>
                  </div>
                  <form onSubmit={handleStudentLogin}>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Username
                      </label>
                      <motion.input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        whileFocus={{ scale: 1.01 }}
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Role
                      </label>
                      <motion.input
                        type="text"
                        name="role"
                        placeholder="student/teacher"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        whileFocus={{ scale: 1.01 }}
                      />
                    </div>
                    <motion.button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Login as Student
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}