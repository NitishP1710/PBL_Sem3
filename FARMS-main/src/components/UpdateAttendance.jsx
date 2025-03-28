import React, { useState } from "react";
import axios from "axios";

const UpdateAttendance = () => {
  const [attendance, setAttendance] = useState({
    rollNumber: "",
    date: "",
    status: "",
  });
  const [isFetched, setIsFetched] = useState(false);

  const handleFetchAttendance = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:5008/api/v1/getattendance`, {
        params: {
          rollNumber: attendance.rollNumber,
          date: attendance.date,
        },
      });

      if (res.data) {
        setAttendance((prev) => ({
          ...prev,
          status: res.data.status,
        }));
        setIsFetched(true);
      } else {
        alert("No attendance record found for the selected date.");
        setIsFetched(false);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
      alert("Failed to fetch attendance.");
      setIsFetched(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttendance((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsFetched(false); // Reset fetched status when inputs change
  };

  const formatDate = (date) => {
    if (!date) return "";
    const formattedDate = new Date(date).toISOString().split("T")[0]; // Convert to yyyy-mm-dd format
    return formattedDate;
  };

  return (
    <div className="mt-5 max-w-md mx-auto p-6 bg-white rounded-xl shadow-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">View Attendance</h2>
      <form onSubmit={handleFetchAttendance} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Roll Number
          </label>
          <input
            type="text"
            name="rollNumber"
            value={attendance.rollNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={attendance.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-duration-300"
        >
          Show Status
        </button>
      </form>
      {isFetched && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Attendance Status
          </h3>
          <p className="text-gray-700">
            <strong>Date:</strong> {formatDate(attendance.date)}
          </p>
          <p className="text-gray-700">
            <strong>Status:</strong>{" "}
            {attendance.status === "present" ? "Present" : "Absent"}
          </p>
        </div>
      )}
    </div>
  );
};

export default UpdateAttendance;