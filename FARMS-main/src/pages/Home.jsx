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
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      <th className="w-1/4 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
                      <th className="w-1/4 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="w-1/4 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">% Attend</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900">EM3</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">20</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">20</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">100</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900">DSA</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">15</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">12</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">83</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900">PPL</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">18</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">18</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">100</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900">MP</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">21</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">21</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">100</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900">SE</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">10</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">0</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">0</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900">DSA-lab</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">6</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">6</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">100</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900">MP-lab</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">10</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">9</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">90</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900">PBL-lab</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">5</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">4</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">80</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
