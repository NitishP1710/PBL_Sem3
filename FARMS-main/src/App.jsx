import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import TeacherDashboard from "./components/TeacherDashboard";
import StudentDashboard from "./components/StudentDashboard";
import Navbar from "./components/Navbar"; // Import Navbar
import Footer from "./components/Footer"; // Import Footer

export default function App() {
  const [userType, setUserType] = useState(null); // null, 'teacher', or 'student'

  return (
    <Router>
      {/* Flex container to ensure footer sticks to the bottom */}
      <div className="min-h-screen flex flex-col">
        {/* Navbar (visible on all routes except login) */}
        <Routes>
          <Route path="/login" element={null} /> {/* Hide Navbar on login */}
          <Route path="*" element={userType ? <Navbar /> : null} /> {/* Show Navbar on all other routes */}
        </Routes>

        {/* Main content area */}
        <main className="flex-1">
          <Routes>
            {/* Login Route */}
            <Route path="/login" element={<Login setUserType={setUserType} />} />

            {/* Teacher Dashboard Route */}
            <Route path="/teacherDashboard" element={userType === 'teacher' ? <TeacherDashboard /> : <Navigate to="/login" />} />

            {/* Student Dashboard Route */}
            <Route path="/studentDashboard/*" element={userType === 'student' ? <StudentDashboard /> : <Navigate to="/login" />} />

            {/* Default Route */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>

        {/* Footer (visible on all routes except login) */}
        <Routes>
          <Route path="/login" element={null} /> {/* Hide Footer on login */}
          <Route path="*" element={userType ? <Footer /> : null} /> {/* Show Footer on all other routes */}
        </Routes>
      </div>
    </Router>
  );
}