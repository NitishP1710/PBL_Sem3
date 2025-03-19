<<<<<<< HEAD
export default function FeedbackForm() {
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    alert("Thank You for your feedback!");
    e.target.reset();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Share Your Feedback</h2>
      <form onSubmit={handleFeedbackSubmit} className="space-y-6">
        <div className="form-group">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          />
        </div>
        <div className="form-group">
          <label htmlFor="feedback" className="block text-sm font-semibold text-gray-700 mb-2">Feedback</label>
          <textarea
            id="feedback"
            name="feedback"
            rows="4"
            required
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md hover:shadow-lg"
        >
          Submit Feedback
        </button>
      </form>
=======
import React from "react";

export default function FeedbackForm() {
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const feedback = e.target.feedback.value;

    try {
      // Send feedback to the backend
      const res = await fetch("http://localhost:5007/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, feedback }),
      });

      if (res.ok) {
        e.target.reset();
        alert("Feedback submitted successfully!");
      } else {
        alert("Error submitting feedback.");
      }
    } catch (error) {
      alert("Error submitting feedback.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Feedback Form */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-center mb-6">Feedback Form</h1>
          <form onSubmit={handleFeedbackSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
                Feedback
              </label>
              <textarea
                id="feedback"
                name="feedback"
                rows="4"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
>>>>>>> 9138f035f136f918b50f0957ce5342f194a8be2f
    </div>
  );
}