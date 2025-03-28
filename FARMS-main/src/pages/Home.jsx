import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import AttendanceChart from '../components/AttendanceChart';
import Card from '../components/Card';
import SubjectList from '../components/SubjectList';
import BacklogSubjects from '../components/BacklogSubjects';
import EventsList from '../components/EventsList';
import Footer from '../components/Footer';
import StudentList from '../components/StudentList';
import FeesStatus from '../components/FeesStatus';
import { Users, Calendar, CreditCard, BookOpen, BarChart, User } from 'lucide-react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch students from the backend
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5007/api/v1/teacher/students");
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Fetch attendance data from the backend
  const fetchAttendanceData = async () => {
    try {
      const res = await axios.get("http://localhost:5007/api/v1/teacher/attendance");
      setAttendanceData(res.data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  // Fetch feedback data from the backend
  const fetchFeedback = async () => {
    try {
      const res = await axios.get("http://localhost:5007/feedback");
      setFeedbackList(res.data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  // Fetch all data on component mount
  useEffect(() => {
    const fetchData = async () => {
      await fetchStudents();
      await fetchAttendanceData();
      setLoading(false);
    };
    fetchData();
  }, []);

  // Handle feedback section click
  const handleFeedbackClick = async () => {
    if (!showFeedback) {
      await fetchFeedback();
    }
    setShowFeedback(!showFeedback);
  };

  // Filter students based on search query
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Navbar/>
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Student List */}
          <StudentList students={filteredStudents} />

          {/* Attendance Chart */}
          <div className="bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 col-span-full lg:col-span-2">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Attendance</h2>
                <Calendar className="h-6 w-6 text-blue-500" />
              </div>
              <AttendanceChart attendanceData={attendanceData} />
            </div>
          </div>

          {/* Cards */}
          <Card
            icon={<Users className="h-8 w-8 text-blue-500" />}
            title="Result"
            description="View your academic performance"
            onClick={() => navigate("/results")}
          />
          <Card
            icon={<CreditCard className="h-8 w-8 text-blue-500" />}
            title="Fees Status"
            description="View payment details"
            onClick={() => navigate("/fees-status")}
          />
          <Card
            icon={<BookOpen className="h-8 w-8 text-blue-500" />}
            title="Class Schedule"
            description="View your class timetable"
            onClick={() => navigate("/class-schedule")}
          />
          <Card
            icon={<BarChart className="h-8 w-8 text-blue-500" />}
            title="Exam Results"
            description="Check your exam results"
            onClick={() => navigate("/exam-results")}
          />

          {/* Mark Attendance Button */}
          {/* <button
            onClick={() => navigate("/mark-attendance")}
            className="flex items-center justify-center space-x-2 text-2xl bg-white shadow-lg text-black  py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105"
          >
            <Calendar className="h-5 w-5 text-blue-500" />
            <span>Mark Attendance</span><br/>
          </button> */}

          {/* Other Components */}
          <SubjectList />
          <EventsList />
          <BacklogSubjects />

          {/* Feedback Section */}
          <div
            className="bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 cursor-pointer"
            onClick={handleFeedbackClick}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Feedback</h2>
              </div>
              {showFeedback && (
                <div className="space-y-4">
                  {feedbackList.length === 0 ? (
                    <p className="text-gray-600">No feedback submitted yet.</p>
                  ) : (
                    feedbackList.map((item, index) => (
                      <div
                        key={index}
                        className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                        dangerouslySetInnerHTML={{ __html: item.feedback }}
                      />
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}