import React, { useState, useEffect } from "react";
import axios from "axios";
import TeacherNavbar from "./TeacherNavbar";

const FeesStatus = () => {
  const [feesData, setFeesData] = useState([]);

  useEffect(() => {
    const fetchFeesData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5007/api/v1/teacher/fees"
        );
        setFeesData(res.data);
      } catch (error) {
        console.error("Error fetching fees data:", error);
      }
    };
    fetchFeesData();
  }, []);

  return (
    <div>
      <TeacherNavbar />
      <div className="mt-5 mx-2 bg-white shadow-2xl rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Fees Status</h2>
          </div>
          <ul className="space-y-3">
            {feesData.length === 0 ? (
              <p className="text-gray-600">No fees data found.</p>
            ) : (
              feesData.map((fee, index) => (
                <li
                  key={index}
                  className="p-3 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                >
                  <p className="text-gray-800 font-medium">{fee.studentName}</p>
                  <p className="text-sm text-gray-600">Amount: ${fee.amount}</p>
                  <p className="text-sm text-gray-600">Status: {fee.status}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FeesStatus;
