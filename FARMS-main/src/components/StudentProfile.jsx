import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StudentProfile = () => {
  const { rollNumber } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch student profile
  const fetchStudent = async () => {
    try {
      const res = await axios.get(`http://localhost:5007/api/v1/teacher/students/${rollNumber}`);
      setStudent(res.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [rollNumber]);

  // Generate random results data
  const generateRandomResults = () => {
    const subjects = ["Mathematics", "Science", "English", "History", "Geography"];
    return subjects.map((subject) => ({
      subject,
      marks: Math.floor(Math.random() * 100), // Random marks between 0 and 100
    }));
  };

  // Generate random attendance data
  const generateRandomAttendance = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split("T")[0]); // Format as YYYY-MM-DD
    }
    return dates.map((date) => ({
      date,
      status: Math.random() > 0.5 ? "present" : "absent", // Random status
    }));
  };

  // Chart data for results
  const resultsChartData = {
    labels: generateRandomResults().map((result) => result.subject),
    datasets: [
      {
        label: "Marks",
        data: generateRandomResults().map((result) => result.marks),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Chart data for attendance
  const attendanceChartData = {
    labels: generateRandomAttendance().map((entry) => entry.date),
    datasets: [
      {
        label: "Attendance",
        data: generateRandomAttendance().map((entry) => (entry.status === "present" ? 1 : 0)),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  if (loading) {
    return <p className="text-center mt-8">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Student Profile</h1>
      <div className="bg-white shadow-lg rounded-2xl p-6">
        {/* Student Details */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Student Details</h2>
          <div className="space-y-2">
            <p><strong>Roll Number:</strong> {student.rollNumber}</p>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Class:</strong> {student.className}</p>
            <p><strong>Division:</strong> {student.division}</p>
            <p><strong>Address:</strong> {student.address}</p>
            <p><strong>Phone:</strong> {student.phone}</p>
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Exam Results</h2>
          <div className="h-64">
            <Bar
              data={resultsChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    text: "Subject-wise Marks",
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Attendance */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Attendance</h2>
          <div className="h-64">
            <Bar
              data={attendanceChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    text: "Daily Attendance",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;