import React, { useState, useEffect } from "react";
import TeacherNavbar from "./TeacherNavbar";

const ViewFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch("http://localhost:5008/api/v1/feedback");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch feedback");
        }

        setFeedbackList(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading feedback data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <TeacherNavbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Student Feedback
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b text-left">Student Name</th>
                <th className="py-3 px-4 border-b text-left">Email</th>
                <th className="py-3 px-4 border-b text-left">Feedback</th>
                <th className="py-3 px-4 border-b text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {feedbackList.length > 0 ? (
                feedbackList.map((feedback) => (
                  <tr key={feedback.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">
                      {feedback.student_name}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {feedback.student_email}
                    </td>
                    <td className="py-3 px-4 border-b">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: feedback.feedback_text,
                        }}
                      />
                    </td>
                    <td className="py-3 px-4 border-b">
                      {new Date(feedback.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">
                    No feedback entries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewFeedback;
