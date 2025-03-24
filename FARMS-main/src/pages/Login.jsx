import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUserType }) {
  const navigate = useNavigate();

  const handleTeacherLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    console.log("Teacher Login Attempt:", { username, password }); // Add this line

    if (username === "admin" && password === "admin123") {
      setUserType("teacher");
      navigate("/teacherdashboard", { state: { userType: "teacher" } });
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
        setUserType("student");
        alert(`Welcome, ${data.message}`);
        navigate("/studentdashboard", { state: { userType: "student" } });
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Error logging in.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-black to-purple-200">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-96 mr-4">
        <h1 className="text-2xl font-bold text-center mb-4">Teacher Login</h1>
        <form onSubmit={handleTeacherLogin}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Username</label>
            <input type="text" name="username" placeholder="Username" className="w-full p-2 border rounded-lg" required />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <input type="password" name="password" placeholder="Password" className="w-full p-2 border rounded-lg" required />
          </div>
          <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Login as Teacher
          </button>
        </form>
      </div>
      <div className="bg-white shadow-lg rounded-2xl p-6 w-96 ml-4">
        <h1 className="text-2xl font-bold text-center mb-4">Student Login</h1>
        <form onSubmit={handleStudentLogin}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Username</label>
            <input type="text" name="username" placeholder="Username" className="w-full p-2 border rounded-lg" required />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <input type="password" name="password" placeholder="Password" className="w-full p-2 border rounded-lg" required />
          </div>
          <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Login as Student
          </button>
        </form>
      </div>
    </div>
  );
}
