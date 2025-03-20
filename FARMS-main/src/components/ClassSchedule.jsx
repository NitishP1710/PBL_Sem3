import React, { useState, useEffect } from "react";
import axios from "axios";

const ClassSchedule = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await axios.get("http://localhost:5007/api/v1/teacher/schedule");
        setSchedule(res.data);
      } catch (error) {
        console.error("Error fetching class schedule:", error);
      }
    };
    fetchSchedule();
  }, []);

  return (
    <div className="mt-5 mx-2 bg-white shadow-2xl rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Class Schedule</h2>
        </div>
        <ul className="space-y-3">
          {schedule.length === 0 ? (
            <p className="text-gray-600">No schedule found.</p>
          ) : (
            schedule.map((item, index) => (
              <li
                key={index}
                className="p-3 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              >
                <p className="text-gray-800 font-medium">{item.day}</p>
                <p className="text-sm text-gray-600">{item.time}: {item.subject}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default ClassSchedule;