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
    </div>
  );
}