import { useNavigate } from "react-router-dom";
import { LogOut, GraduationCap, Users, Calendar, CreditCard, BookOpen, AlertTriangle, PartyPopper } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Navbar */}
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

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Result Card */}
          <div className="bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-blue-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Result</h2>
              <p className="text-gray-600">View your academic performance</p>
            </div>
          </div>
          
          {/* Attendance Card */}
          <div className="bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 col-span-full lg:col-span-2">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Attendance</h2>
                <Calendar className="h-6 w-6 text-blue-500" />
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Present</th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Attendance %</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { subject: "EM3", present: 20, total: 20 },
                      { subject: "DSA", present: 15, total: 12 },
                      { subject: "PPL", present: 18, total: 18 },
                      { subject: "MP", present: 21, total: 21 },
                      { subject: "SE", present: 10, total: 0 },
                      { subject: "DSA-lab", present: 6, total: 6 },
                      { subject: "MP-lab", present: 10, total: 9 },
                      { subject: "PBL-lab", present: 5, total: 4 }
                    ].map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.subject}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{item.present}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{item.total}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                          <span className={`px-2 py-1 rounded-full ${
                            (item.present/item.total * 100) >= 75 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {item.total === 0 ? 0 : Math.round(item.present/item.total * 100)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Fees Status */}
          <div className="bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <CreditCard className="h-8 w-8 text-blue-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Fees Status</h2>
              <p className="text-gray-600">View payment details</p>
            </div>
          </div>

          {/* Subject List */}
          <div className="bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Subject List</h2>
                <BookOpen className="h-6 w-6 text-blue-500" />
              </div>
              <ul className="space-y-2">
                {[
                  "MicroProcessor",
                  "Software Engineering",
                  "Principles of Programming Languages",
                  "Data Structures And Algorithms",
                  "Engineering Mathematics-3",
                  "Project Based Learning",
                  "Microprocessor Lab",
                  "Maths Tutorial",
                  "Code Of Conduct",
                  "DSA Lab",
                ].map((subject, index) => (
                  <li key={index} className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    {subject}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Backlog Subjects */}
          <div className="bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Backlog Subjects</h2>
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
              <ul className="space-y-3">
                {["Fundamentals of Data Structures", "Computer Graphics"].map((subject, index) => (
                  <li key={index} className="flex items-center text-red-600 bg-red-50 p-2 rounded-lg">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    {subject}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Events */}
          <div className="bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Events</h2>
                <PartyPopper className="h-6 w-6 text-blue-500" />
              </div>
              <ul className="space-y-3">
                {["Impetus and Concepts (InC)", "Addiction", "Xenia"].map((event, index) => (
                  <li key={index} className="flex items-center text-blue-600 bg-blue-50 p-2 rounded-lg">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    {event}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}