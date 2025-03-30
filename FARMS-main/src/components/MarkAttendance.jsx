import React, { useState, useEffect } from "react";
import axios from "axios";
import TeacherNavbar from "./TeacherNavbar";

const MarkAttendance = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch students from the backend
  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5007/api/v1/teacher/students"
      );
      setStudents(res.data);

      // Initialize attendance status for each student
      const initialAttendance = {};
      res.data.forEach((student) => {
        initialAttendance[student.rollNumber] = "present"; // Default status
      });
      setAttendance(initialAttendance);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle attendance status change
  const handleAttendanceChange = (rollNumber, status) => {
    setAttendance((prev) => ({
      ...prev,
      [rollNumber]: status,
    }));
  };

  // Submit attendance
  const submitAttendance = async () => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date
    const attendanceArray = students.map((student) => ({
      rollNumber: student.rollNumber,
      date: today,
      status: attendance[student.rollNumber],
    }));

    try {
      const res = await axios.post(
        "http://localhost:5007/api/v1/teacher/attendance",
        {
          attendanceData: attendanceArray,
        }
      );
      if (res.data.success) {
        alert("Attendance marked successfully!");
      } else {
        alert("Failed to mark attendance.");
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
      alert("Failed to mark attendance.");
    }
  };

  if (loading) {
    return <p className="text-center mt-8">Loading...</p>;
  }

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${date}/${month}/${year}`;
  }

  return (
    <div>
      <TeacherNavbar />
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Mark Attendance</h1>
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Roll No</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-center">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.rollNumber} className="border-b">
                  <td className="p-3">{student.rollNumber}</td>
                  <td className="p-3">{student.name}</td>
                  <td className="p-3">{getDate()}</td>
                  <td className="p-3 text-center">
                    <button
                      className={`mr-2 px-3 py-1 rounded-md ${
                        attendance[student.rollNumber] === "present"
                          ? "bg-green-500 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() =>
                        handleAttendanceChange(student.rollNumber, "present")
                      }
                    >
                      Present
                    </button>
                    <button
                      className={`px-3 py-1 rounded-md ${
                        attendance[student.rollNumber] === "absent"
                          ? "bg-red-500 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() =>
                        handleAttendanceChange(student.rollNumber, "absent")
                      }
                    >
                      Absent
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={submitAttendance}
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit Attendance
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkAttendance;
