import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle, RefreshCw, AlertCircle } from "lucide-react";
import Navbar from "./Navbar";

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      const res = await axios.get("http://localhost:5008/api/v1/students");
      console.log("API Response:", res.data); // Debugging log

      if (!res.data) {
        throw new Error("Server returned empty response");
      }

      // Extract students from the response
      const studentsArray = res.data.data || [];

      // Validate student records
      const validStudents = studentsArray.map(student => ({
        rollNumber: String(student.rollNumber),
        name: String(student.name)
      }));

      if (validStudents.length === 0) {
        throw new Error("Response contained no valid student records");
      }

      setStudents(validStudents);

      // Initialize attendance data with default 'present' status
      const initialAttendance = {};
      validStudents.forEach(student => {
        initialAttendance[student.rollNumber] = "present";
      });
      setAttendanceData(initialAttendance);

    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.response?.data?.message || 
               error.message || 
               "Failed to fetch student data");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAttendanceChange = (rollNumber, status) => {
    setAttendanceData(prev => ({
      ...prev,
      [rollNumber]: status
    }));
  };

  const submitAttendance = async () => {
    if (submitting || students.length === 0) return;

    setSubmitting(true);
    setError(null);
    setSuccess(null);
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    try {
        const attendanceRecords = students.map(student => ({
            rollNumber: student.rollNumber,
            date: today,
            status: attendanceData[student.rollNumber] || "present"
        }));

        console.log("Attendance Records:", attendanceRecords); // Debugging log

        // Loop through each record and send individual requests
        for (const record of attendanceRecords) {
          console.log("Sending record:", record); // Debugging log
            await axios.post("http://localhost:5008/api/v1/attendance", record);
        }

        setSuccess("Attendance submitted successfully!");
        setTimeout(() => setSuccess(null), 5000); // Auto-dismiss success message
    } catch (error) {
        console.error("Submission error:", error);
        setError(error.response?.data?.message || error.message || "Failed to submit attendance");
    } finally {
        setSubmitting(false);
    }
};


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <RefreshCw className="animate-spin h-12 w-12 text-blue-500 mb-4" />
        <p className="text-lg">Loading student data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
          <div className="flex flex-col items-center text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
            <p className="mb-6">{error}</p>
            <div className="flex gap-4">
              <button
                onClick={fetchStudents}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
          <div className="flex flex-col items-center text-center">
            <AlertCircle className="h-12 w-12 text-yellow-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">No Students Found</h2>
            <p className="mb-6">The student list is currently empty.</p>
            <button
              onClick={fetchStudents}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh List
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar/>
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
        <button
          onClick={fetchStudents}
          className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
          {success}
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Roll No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.rollNumber}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.rollNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleAttendanceChange(student.rollNumber, "present")}
                        className={`flex items-center px-3 py-1 rounded-md ${
                          attendanceData[student.rollNumber] === "present"
                            ? "bg-green-500 text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Present
                      </button>
                      <button
                        onClick={() => handleAttendanceChange(student.rollNumber, "absent")}
                        className={`flex items-center px-3 py-1 rounded-md ${
                          attendanceData[student.rollNumber] === "absent"
                            ? "bg-red-500 text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Absent
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-gray-50 flex justify-end">
          <button
            onClick={submitAttendance}
            disabled={submitting}
            className={`flex items-center px-6 py-2 rounded-md text-white ${
              submitting ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {submitting ? (
              <>
                <RefreshCw className="animate-spin h-4 w-4 mr-2" />
                Submitting...
              </>
            ) : (
              "Submit Attendance"
            )}
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default TeacherDashboard;