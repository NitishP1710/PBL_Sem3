import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, LogOut, Menu, X, ClipboardList, MessageSquare } from "lucide-react";

function StudentNavbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userType');
    navigate('/login');
  };

  const handleHome = () => navigate('/studentDashboard');
  const handleFeedback = () => navigate('/feedback');

  const menuItems = [
    { 
      label: "Send Feedback", 
      icon: <MessageSquare size={16} />, 
      action: handleFeedback,
      color: "bg-blue-500 hover:bg-blue-600" 
    }
  ];

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6" />
          <button onClick={handleHome} className="text-xl font-bold">
            Student Dashboard
          </button>
        </div>

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

export default StudentNavbar;