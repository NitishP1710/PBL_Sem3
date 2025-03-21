import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch students from the API
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5007/api/students");
      setStudents(res.data);
      setLoading(false);

      // Initialize attendanceData with 'present' as default
      const initialAttendance = {};
      res.data.forEach((student) => {
        initialAttendance[student.rollNumber] = "present"; // Default status
      });
      setAttendanceData(initialAttendance);
    } catch (error) {
      console.error("Error fetching students:", error);
      alert("Failed to fetch students. Please try again.");
    }
  };

  useEffect(() => {
    fetchStudents(); // Load student list on component mount
  }, []);

  // Handle attendance status change for a student
  const handleAttendanceChange = (rollNumber, status) => {
    setAttendanceData((prevData) => ({
      ...prevData,
      [rollNumber]: status,
    }));
  };

  // Submit attendance
  const submitAttendance = async () => {
    setSubmitting(true);
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

    const attendanceArray = students.map((student) => ({
      rollNumber: student.rollNumber,
      status: attendanceData[student.rollNumber], // Updated status
      date: today,
    }));

    try {
      const res = await axios.post(
        "http://localhost:5007/api/attendance",
        { attendanceData: attendanceArray }
      );
      alert(res.data.message); // Show success message
    } catch (error) {
      console.error("Error updating attendance:", error);
      alert("Error updating attendance. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-8">Loading students...</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Teacher Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th scope="col" className="p-3 text-left">Roll No</th>
              <th scope="col" className="p-3 text-left">Name</th>
              <th scope="col" className="p-3 text-center">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.rollNumber} className="border-b">
                <td className="p-3">{student.rollNumber}</td>
                <td className="p-3">{student.name}</td>
                <td className="p-3 text-center">
                  <button
                    aria-label="Mark as present"
                    className={`mr-2 px-3 py-1 rounded-md ${
                      attendanceData[student.rollNumber] === "present"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() =>
                      handleAttendanceChange(student.rollNumber, "present")
                    }
                  >
                    <CheckCircle className="h-5 w-5 inline" /> Present
                  </button>
                  <button
                    aria-label="Mark as absent"
                    className={`px-3 py-1 rounded-md ${
                      attendanceData[student.rollNumber] === "absent"
                        ? "bg-red-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() =>
                      handleAttendanceChange(student.rollNumber, "absent")
                    }
                  >
                    <XCircle className="h-5 w-5 inline" /> Absent
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={submitAttendance}
          disabled={submitting}
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300 disabled:bg-blue-300"
        >
          {submitting ? "Submitting..." : "Submit Attendance"}
        </button>
      </div>
    </div>
  );
};

export default TeacherDashboard;