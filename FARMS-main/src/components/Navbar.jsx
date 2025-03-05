import { LogOut, GraduationCap } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 flex justify-between items-center shadow-lg">
      <div className="flex items-center space-x-2">
        <GraduationCap className="h-6 w-6" />
        <h1 className="text-xl font-bold">Student Dashboard</h1>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center space-x-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
      >
        <LogOut className="h-5 w-5" />
        <span>Logout</span>
      </button>
    </nav>
  );
}