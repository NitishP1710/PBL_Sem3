import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StudentAttendanceGraph = ({ rollNumber }) => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const res = await axios.get(`http://localhost:5007/api/v1/teacher/attendance/${rollNumber}`);
        setAttendanceData(res.data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };
    fetchAttendanceData();
  }, [rollNumber]);

  const data = {
    labels: attendanceData.map((entry) => entry.date),
    datasets: [
      {
        label: "Attendance",
        data: attendanceData.map((entry) => (entry.status === "present" ? 1 : 0)),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Attendance Graph</h2>
        </div>
        <Line data={data} />
      </div>
    </div>
  );
};

export default StudentAttendanceGraph;