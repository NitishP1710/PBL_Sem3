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

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Reusable Card Component */}
          {[
            { title: "Result", description: "Check your grades" },
            { title: "Attendance", description: "View attendance records" },
            { title: "Fees Status", description: "Check payment details" }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 h-64 flex items-center justify-center text-center p-6"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h2>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}

          {/* Subject List (Scrollable) */}
          <div className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 h-64 p-6 text-center overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Subject List
            </h2>
            <p className="text-gray-600 mb-3">View enrolled subjects</p>
            <ul className="text-gray-700 font-medium space-y-2 text-left inline-block">
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
                <li key={index} className="flex items-center">
                  <span className="text-blue-500 mr-2">•</span> {subject}
                </li>
              ))}
            </ul>
          </div>

          {/* Backlog Subjects (Scrollable) */}
          <div className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 h-64 p-6 text-center overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Backlog Subjects
            </h2>
            <ul className="text-red-500 font-medium space-y-2">
              {["Fundamentals of Data Structures", "Computer Graphics"].map(
                (subject, index) => (
                  <li key={index}>• {subject}</li>
                )
              )}
            </ul>
          </div>

          {/* Events */}
          <div className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 h-64 p-6 text-center overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Events</h2>
            <ul className="text-blue-600 font-semibold space-y-2">
              {["Impetus and Concepts (InC)", "Addiction", "Xenia"].map(
                (event, index) => (
                  <li key={index}>• {event}</li>
                )
              )}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
