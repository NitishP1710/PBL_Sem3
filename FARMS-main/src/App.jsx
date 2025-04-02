import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import TeacherDashboard from "./components/TeacherDashboard";
import StudentDashboard from "./components/StudentDashboard";
import Footer from "./components/Footer";
import MarkAttendance from "./components/MarkAttendance";
import StudentForm from "./components/StudentForm";
import FeesStatus from "./components/FeesStatus";
import UpdateAttendance from "./components/UpdateAttendance";
import FeedbackForm from "./components/FeedbackForm";
import ViewFeedback from './components/ViewFeedback';

export default function App() {
  const [userType, setUserType] = useState(localStorage.getItem('userType'));

  useEffect(() => {
    if (userType) {
      localStorage.setItem('userType', userType);
    } else {
      localStorage.removeItem('userType');
    }
  }, [userType]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login setUserType={setUserType} />} />
            
            {/* Teacher Routes */}
            <Route path="/teacherDashboard" element={
              userType === 'teacher' ? <TeacherDashboard /> : <Navigate to="/login" replace />
            } />
            <Route path="/mark-attendance" element={
              userType === 'teacher' ? <MarkAttendance /> : <Navigate to="/login" replace />
            } />
            <Route path="/add-student" element={
              userType === 'teacher' ? <StudentForm /> : <Navigate to="/login" replace />
            } />
            <Route path="/fees-status" element={
              userType === 'teacher' ? <FeesStatus /> : <Navigate to="/login" replace />
            } />
            <Route path="/view-feedback" element={
              userType === 'teacher' ? <ViewFeedback /> : <Navigate to="/login" replace />
            } />
            
            {/* Student Routes */}
            <Route path="/studentDashboard" element={
              userType === 'student' ? <StudentDashboard /> : <Navigate to="/login" replace />
            } />
            <Route path="/attendance" element={
              userType === 'student' ? <UpdateAttendance /> : <Navigate to="/login" replace />
            } />
            <Route path="/feedback" element={
              userType ? <FeedbackForm /> : <Navigate to="/login" replace />
            } />
            
            {/* Default Route - Always redirect to login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>

        {/* Footer visibility control */}
        <Routes>
          <Route path="/login" element={null} />
          <Route path="*" element={userType ? <Footer /> : null} />
        </Routes>
      </div>
    </Router>
  );
}