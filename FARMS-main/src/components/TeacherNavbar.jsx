import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, LogOut, Search, UserPlus, Calendar, CreditCard, Menu, X, BookOpenCheck } from "lucide-react";

function TeacherNavbar({ searchQuery, setSearchQuery }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userType');
    navigate('/login');
  };

  const handleHome = () => navigate('/teacherDashboard');
  const handleFeedback = () => navigate('/view-feedback');
  const handleAddStudent = () => navigate("/add-student");
  const handleMarkAttendance = () => navigate("/mark-attendance");
  const handleFeesStatus = () => navigate("/fees-status");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const menuItems = [
    { 
      label: "Add Student", 
      icon: <UserPlus size={16} />, 
      action: handleAddStudent,
      color: "bg-green-500 hover:bg-green-600" 
    },
    { 
      label: "Mark Attendance", 
      icon: <Calendar size={16} />, 
      action: handleMarkAttendance,
      color: "bg-yellow-500 hover:bg-yellow-600" 
    },
    { 
      label: "See Feedback", 
      icon: <BookOpenCheck size={16} />, 
      action: handleFeedback,
      color: "bg-blue-500 hover:bg-blue-600" 
    },
    { 
      label: "Fee Status", 
      icon: <CreditCard size={16} />, 
      action: handleFeesStatus,
      color: "bg-purple-500 hover:bg-purple-600" 
    }
  ];

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6" />
          <button onClick={handleHome} className="text-xl font-bold">
            Teacher Dashboard
          </button>
        </div>

        <form onSubmit={handleSearch} className="hidden md:block relative flex-1 mx-4 max-w-md">
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-1.5 px-4 pr-10 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600">
            <Search className="h-4 w-4" />
          </button>
        </form>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-1 rounded-md hover:bg-blue-500 transition-all"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="fixed right-0 top-16 bg-blue-700 text-white p-3 space-y-2 w-56 shadow-xl z-50">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.action();
                setIsMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-2 ${item.color} text-white py-2 px-3 rounded-md transition-all text-sm`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-md transition-all text-sm"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default TeacherNavbar;