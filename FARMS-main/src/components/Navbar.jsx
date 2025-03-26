import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GraduationCap, LogOut, Search, MessageSquare, UserPlus, Calendar, CreditCard, Menu, X, BookOpenCheck, ClipboardList } from "lucide-react";

function Navbar({ userType, searchQuery, setSearchQuery }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(userType);

  // Detect role based on current route
  useEffect(() => {
    if (location.pathname.includes('teacher')) {
      setUserRole('teacher');
    } else if (location.pathname.includes('student')) {
      setUserRole('student');
    }
  }, [location]);

  // Common handlers
  const handleLogout = () => {
    localStorage.removeItem('userType');
    navigate('/login');
  };

  const handleHome = () => {
    navigate(userRole === 'teacher' ? '/teacherDashboard' : '/studentDashboard');
  };

  // Role-based handlers with event prevention
  const handleFeedback = (e) => {
    e?.preventDefault();
    navigate(userRole === 'teacher' ? '/feedback' : '/feedback');
  };

  const handleAddStudent = (e) => {
    e?.preventDefault();
    navigate("/add-student");
  };

  const handleMarkAttendance = (e) => {
    e?.preventDefault();
    navigate("/mark-attendance");
  };

  const handleViewAttendance = (e) => {
    e?.preventDefault();
    navigate("/attendance");
  };

  const handleFeesStatus = (e) => {
    e?.preventDefault();
    navigate("/fees-status");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  // Teacher menu items with proper click handlers
  const teacherMenuItems = [
    { 
      label: "Add Student", 
      icon: <UserPlus size={16} />, 
      action: (e) => handleAddStudent(e),
      color: "bg-green-500 hover:bg-green-600" 
    },
    { 
      label: "Mark Attendance", 
      icon: <Calendar size={16} />, 
      action: (e) => handleMarkAttendance(e),
      color: "bg-yellow-500 hover:bg-yellow-600" 
    },
    { 
      label: "See Feedback", 
      icon: <BookOpenCheck size={16} />, 
      action: (e) => handleFeedback(e),
      color: "bg-blue-500 hover:bg-blue-600" 
    },
    { 
      label: "Fee Status", 
      icon: <CreditCard size={16} />, 
      action: (e) => handleFeesStatus(e),
      color: "bg-purple-500 hover:bg-purple-600" 
    }
  ];

  // Student menu items with proper click handlers
  const studentMenuItems = [
    { 
      label: "Attendance", 
      icon: <ClipboardList size={16} />, 
      action: (e) => handleViewAttendance(e),
      color: "bg-yellow-500 hover:bg-yellow-600" 
    },
    { 
      label: "Send Feedback", 
      icon: <MessageSquare size={16} />, 
      action: (e) => handleFeedback(e),
      color: "bg-blue-500 hover:bg-blue-600" 
    }
  ];

  if (!userRole) return null;

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 flex justify-between items-center shadow-lg">
        {/* Logo and Title */}
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6" />
          <button onClick={handleHome} className="text-xl font-bold">
            {userRole === 'teacher' ? 'Teacher Dashboard' : 'Student Dashboard'}
          </button>
        </div>

        {/* Search Bar (Teacher only) */}
        {userRole === 'teacher' && (
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
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          className="p-1 rounded-md hover:bg-blue-500 transition-all"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div 
          className="fixed right-0 top-16 bg-blue-700 text-white p-3 space-y-2 w-56 shadow-xl z-50"
          onClick={(e) => e.stopPropagation()} // Prevent event bubbling
        >
          {(userRole === 'teacher' ? teacherMenuItems : studentMenuItems).map((item, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                item.action(e);
                setIsMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-2 ${item.color} text-white py-2 px-3 rounded-md transition-all text-sm`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleLogout();
            }}
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

export default Navbar;