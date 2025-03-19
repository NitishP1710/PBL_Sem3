import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { GraduationCap, LogOut, Search, MessageSquare, UserPlus } from 'lucide-react';

function Navbar({ userType = "teacher" }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleLogout = () => {
    navigate("/");
  }

  const handleFeedback = () => {
    navigate("/feedback"); // Create a feedback route
  }

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
  }

  const handleAddStudent = () => {
    navigate("/add-student"); 
  };

  return (
    <div>
      <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6" />
          <h1 className="text-xl font-bold">
            {userType === "teacher" ? "Teacher Dashboard" : "Student Dashboard"}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {userType === "teacher" ? (
            <>
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="py-2 px-4 pr-10 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button type="submit" className="absolute right-2 top-2 text-gray-600">
                  <Search className="h-5 w-5" />
                </button>
              </form>
              <button
                onClick={handleAddStudent}
                className="flex items-center space-x-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-all duration-300"
              >
                <UserPlus className="h-5 w-5" />
                <span>Add Student</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleFeedback}
              className="flex items-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-300"
            >
              <MessageSquare className="h-5 w-5" />
              <span>Send Feedback</span>
            </button>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-all duration-300"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar