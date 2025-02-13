import { useNavigate } from "react-router-dom";
import { LogOut, GraduationCap, Users, Calendar, CreditCard, BookOpen, AlertTriangle, PartyPopper } from 'lucide-react';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const attendanceData = [
    { subject: "EM3", present: 18, total: 20 },
    { subject: "DSA", present: 12, total: 15 },
    { subject: "PPL", present: 18, total: 18 },
    { subject: "MP", present: 11, total: 21 },
    { subject: "SE", present: 2, total: 10 },
    { subject: "DSA-lab", present: 6, total: 6 },
    { subject: "MP-lab", present: 8, total: 9 },
    { subject: "PBL-lab", present: 4, total: 4 }
  ];

  const attendancePercentages = attendanceData.map(item => 
    item.total === 0 ? 0 : Math.round((item.present / item.total) * 100)
  );

  const barGraphData = {
    labels: attendanceData.map(item => item.subject), // Subjects on x-axis
    datasets: [
      {
        label: "Attendance Percentage",
        data: attendancePercentages, // Attendance percentages on y-axis
        backgroundColor: attendancePercentages.map(percentage => 
          percentage >= 75 ? "rgba(75, 192, 192, 0.6)" : "rgba(255, 99, 132, 0.6)"
        ),
        borderColor: attendancePercentages.map(percentage => 
          percentage >= 75 ? "rgba(75, 192, 192, 1)" : "rgba(255, 99, 132, 1)"
        ),
        borderWidth: 1,
      },
    ],
  };

  // Bar graph options
  const barGraphOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Attendance Percentage (%)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Subjects",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
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
              <div className="h-96">
                <Bar data={barGraphData} options={barGraphOptions} />
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