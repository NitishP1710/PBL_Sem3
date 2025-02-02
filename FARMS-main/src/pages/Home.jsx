import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </nav>

      {/* Updated Main Content */}
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-screen">
          {/* Result */}
          <div className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Result</h2>
              <p className="text-gray-600">Check your grades</p>
            </div>
          </div>
          
          {/* Attendance */}
          <div className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Attendance</h2>
              <p className="text-gray-600">View attendance records</p>
            </div>
          </div>

          {/* Fees Status */}
          <div className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Fees Status</h2>
              <p className="text-gray-600">Check payment details</p>
            </div>
          </div>

          {/* Subject List */}
          <div className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Subject List</h2>
              <p className="text-gray-600">View enrolled subjects</p>
            </div>
          </div>

          {/* Backlog Subjects */}
          <div className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Backlog Subjects</h2>
              <p className="text-gray-600">Check pending courses</p>
            </div>
          </div>

          {/* Events */}
          <div className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Events</h2>
              <p className="text-gray-600">Upcoming college events</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
