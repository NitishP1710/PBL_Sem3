import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  LogOut,
  Search,
  MessageSquare,
  UserPlus,
  Calendar,
  CreditCard,
  Menu,
  X,
  Clock,
  BookOpen,
  BarChart,
} from "lucide-react";

function Navbar({ userType = "teacher", searchQuery, setSearchQuery }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate("/login");
  };

  const handleHome = () => {
    navigate("/");
  }

  const handleFeedback = () => {
    navigate("/feedback");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleAddStudent = () => {
    navigate("/add-student");
  };

  const handleUpdateAttendance = () => {
    navigate("/update-attendance");
  };

  const handleFeesStatus = () => {
    navigate("/fees-status");
  };

  const handleSchedule = () => {
    navigate("/class-schedule");
  };

  const handleResults = () => {
    navigate("/exam-results");
  };

  return (
    <div>
      <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 flex justify-between items-center shadow-lg">
        {/* Left Side: Logo and Title */}
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6" />
          <button onClick={handleHome}>
            <h1 className="text-xl font-bold">
            {userType === "teacher" ? "Teacher Dashboard" : "Student Dashboard"}
          </h1></button>
        </div>

        {/* Middle: Search Bar */}
        <form onSubmit={handleSearch} className="relative flex-1 mx-4 max-w-md">
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 px-4 pr-10 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button type="submit" className="absolute right-2 top-2 text-gray-600">
            <Search className="h-5 w-5" />
          </button>
        </form>

        {/* Right Side: Hamburger Menu */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md hover:bg-blue-500 transition-all duration-300"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Dropdown Menu (Visible when Hamburger is clicked) */}
      {isMenuOpen && (
        <div
          className="fixed right-0 top-16 bg-blue-700 text-white p-4 space-y-4 w-64 shadow-lg transform transition-transform duration-300 ease-in-out"
          style={{ zIndex: 1000 }}
        >
          {/* Buttons */}
          {userType === "teacher" ? (
            <>
              <button
                onClick={handleAddStudent}
                className="w-full flex items-center space-x-2 bg-green-500 text-white py-1.5 px-3 rounded-md hover:bg-green-600 transition-all duration-300 text-sm"
              >
                <UserPlus className="h-4 w-4" />
                <span>Add Student</span>
              </button>
              <button
                onClick={handleUpdateAttendance}
                className="w-full flex items-center space-x-2 bg-yellow-500 text-white py-1.5 px-3 rounded-md hover:bg-yellow-600 transition-all duration-300 text-sm"
              >
                <Calendar className="h-4 w-4" />
                <span>Update Attendance</span>
              </button>
              <button
                onClick={handleFeesStatus}
                className="w-full flex items-center space-x-2 bg-purple-500 text-white py-1.5 px-3 rounded-md hover:bg-purple-600 transition-all duration-300 text-sm"
              >
                <CreditCard className="h-4 w-4" />
                <span>Fees Status</span>
              </button>
              <button
                onClick={handleSchedule}
                className="w-full flex items-center space-x-2 bg-indigo-500 text-white py-1.5 px-3 rounded-md hover:bg-indigo-600 transition-all duration-300 text-sm"
              >
                <Clock className="h-4 w-4" />
                <span>Schedule</span>
              </button>
              <button
                onClick={handleResults}
                className="w-full flex items-center space-x-2 bg-pink-500 text-white py-1.5 px-3 rounded-md hover:bg-pink-600 transition-all duration-300 text-sm"
              >
                <BarChart className="h-4 w-4" />
                <span>Results</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleFeedback}
              className="w-full flex items-center space-x-2 bg-blue-500 text-white py-1.5 px-3 rounded-md hover:bg-blue-600 transition-all duration-300 text-sm"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Send Feedback</span>
            </button>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 bg-red-500 text-white py-1.5 px-3 rounded-md hover:bg-red-600 transition-all duration-300 text-sm"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;