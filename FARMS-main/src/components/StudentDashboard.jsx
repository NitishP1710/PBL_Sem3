import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home"; // Assuming Home is in your pages directory
import FeedbackForm from "./FeedbackForm";
import StudentProfile from "./StudentProfile";
import ClassSchedule from "./ClassSchedule";
import ExamResults from "./ExamResults";

const StudentDashboard = () => {
  return (
    <div className="student-dashboard">
      <Routes>
        {/* Home/Dashboard Route */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        
        {/* Feedback Route */}
        <Route path="/feedback" element={<FeedbackForm />} />
        
        {/* Student Profile Route */}
        <Route path="/profile" element={<StudentProfile />} />
        
        {/* Class Schedule Route */}
        <Route path="/schedule" element={<ClassSchedule />} />
        
        {/* Exam Results Route */}
        <Route path="/results" element={<ExamResults />} />
      </Routes>
    </div>
  );
};

export default StudentDashboard;