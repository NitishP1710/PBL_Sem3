import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import FeedbackForm from "./components/FeedbackForm";
import StudentForm from "./components/StudentForm";
import TeacherDashboard from "./components/TeacherDashboard";
import UpdateAttendance from "./components/UpdateAttendance";
import FeesStatus from "./components/FeesStatus";
import StudentProfile from "./components/StudentProfile";
import ClassSchedule from "./components/ClassSchedule";
import ExamResults from "./components/ExamResults";
import MarkAttendance from "./components/MarkAttendance";
import Navbar from "./components/Navbar"; // Import Navbar
import Footer from "./components/Footer"; // Import Footer

export default function App() {
  return (
    <Router>
      {/* Flex container to ensure footer sticks to the bottom */}
      <div className="min-h-screen flex flex-col">
        {/* Navbar (visible on all routes except login) */}
        <Routes>
          <Route path="/login" element={null} /> {/* Hide Navbar on login */}
          <Route path="/" element={null} /> {/* Show Navbar on all other routes */}
          <Route path="*" element={<Navbar/>}/>
        </Routes>

        {/* Main content area */}
        <main className="flex-1">
          <Routes>
            {/* Default Route */}
            <Route path="/" element={<Home />} />

            {/* Login Route */}
            <Route path="/login" element={<Login />} />

            {/* Home Route */}
            <Route path="/home" element={<Home />} />

            {/* Feedback Route */}
            <Route path="/feedback" element={<FeedbackForm />} />

            {/* Add Student Route */}
            <Route path="/add-student" element={<StudentForm />} />

            {/* Teacher Dashboard Route */}
            <Route path="/teacherDashboard" element={<TeacherDashboard />} />

            {/* Update Attendance Route */}
            <Route path="/update-attendance" element={<UpdateAttendance />} />

            {/* Mark Attendance Route */}
            <Route path="/mark-attendance" element={<MarkAttendance />} />

            {/* Fees Status Route */}
            <Route path="/fees-status" element={<FeesStatus />} />

            {/* Student Profile Route */}
            <Route path="/student-profile/:rollNumber" element={<StudentProfile />} />

            {/* Class Schedule Route */}
            <Route path="/class-schedule" element={<ClassSchedule />} />

            {/* Exam Results Route */}
            <Route path="/exam-results" element={<ExamResults />} />
          </Routes>
        </main>

        {/* Footer (visible on all routes except login) */}
        <Routes>
          <Route path="/login" element={null} /> {/* Hide Footer on login */}
          <Route path="*" element={<Footer />} /> {/* Show Footer on all other routes */}
        </Routes>
      </div>
    </Router>
  );
}