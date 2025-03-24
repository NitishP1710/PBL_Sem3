import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import FeedbackForm from './FeedbackForm';
import StudentForm from './StudentForm';
import UpdateAttendance from './UpdateAttendance';
import FeesStatus from './FeesStatus';
import StudentProfile from './StudentProfile';
import ClassSchedule from './ClassSchedule';
import ExamResults from './ExamResults';
import MarkAttendance from './MarkAttendance';

const StudentDashboard = () => {
  return (
    <div>
      <Routes>
        {/* Home Route */}
        <Route path="/home" element={<Home />} />

        {/* Feedback Route */}
        <Route path="/feedback" element={<FeedbackForm />} />

        {/* Add Student Route */}
        <Route path="/add-student" element={<StudentForm />} />

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
    </div>
  );
};

export default StudentDashboard;