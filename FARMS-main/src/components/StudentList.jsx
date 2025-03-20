import React from "react";
import { useNavigate } from "react-router-dom";

const StudentList = ({ students }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Student List</h2>
        </div>
        <ul className="space-y-3">
          {students.length === 0 ? (
            <p className="text-gray-600">No students found.</p>
          ) : (
            students.map((student, index) => (
              <li
                key={index}
                className="p-3 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                onClick={() => navigate(`/student-profile/${student.rollNumber}`)}
              >
                <p className="text-gray-800 font-medium">{student.name}</p>
                <p className="text-sm text-gray-600">{student.email}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default StudentList;