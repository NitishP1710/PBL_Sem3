import React, { useState } from "react";
import Navbar from '../components/Navbar';
import AttendanceChart from '../components/AttendanceChart';
import Card from '../components/Card';
import SubjectList from '../components/SubjectList';
import BacklogSubjects from '../components/BacklogSubjects';
import EventsList from '../components/EventsList';
import Footer from '../components/Footer';
import { Users, Calendar, CreditCard } from 'lucide-react';

export default function Home() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false); // State to control visibility

  // Function to fetch feedback
  const fetchFeedback = async () => {
    try {
      const res = await fetch("http://localhost:5007/feedback");
      const data = await res.json();
      setFeedbackList(data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  // Function to handle click on the feedback section
  const handleFeedbackClick = async () => {
    if (!showFeedback) {
      // Fetch feedback only if it's not already shown
      await fetchFeedback();
    }
    setShowFeedback(!showFeedback); // Toggle visibility
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card icon={<Users className="h-8 w-8 text-blue-500" />} title="Result" description="View your academic performance" />
          <div className="bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 col-span-full lg:col-span-2">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Attendance</h2>
                <Calendar className="h-6 w-6 text-blue-500" />
              </div>
              <AttendanceChart attendanceData={attendanceData} />
            </div>
          </div>
          <Card icon={<CreditCard className="h-8 w-8 text-blue-500" />} title="Fees Status" description="View payment details" />
          <SubjectList />
          <BacklogSubjects />
          <EventsList />
          <div
            className="bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 cursor-pointer"
            onClick={handleFeedbackClick} // Click handler
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Feedback</h2>
              </div>
              {/* Feedback List */}
              {showFeedback && ( // Only show feedback if `showFeedback` is true
                <div className="space-y-4">
                  {feedbackList.length === 0 ? (
                    <p className="text-gray-600">No feedback submitted yet.</p>
                  ) : (
                    feedbackList.map((item, index) => (
                      <div
                        key={index}
                        className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                        dangerouslySetInnerHTML={{ __html: item.feedback }} // 🚨 Vulnerable to XSS
                      />
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}