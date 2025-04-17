import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import TeacherDashboard from "./components/TeacherDashboard";
import StudentDashboard from "./components/StudentDashboard";
import Footer from "./components/Footer";
import MarkAttendance from "./components/MarkAttendance";
import StudentForm from "./components/StudentForm";
import FeesStatus from "./components/FeesStatus";
import UpdateAttendance from "./components/UpdateAttendance";
import FeedbackForm from "./components/FeedbackForm";
import ViewFeedback from './components/ViewFeedback';

function SSRFTestComponent() {
  const [url, setUrl] = useState("");
  const [ssrfResponse, setSsrfResponse] = useState("");

  const handleSSRFTest = async (e) => {
    e.preventDefault();
    if (!url) return;

    try {
      // Ensure the request is sent to the backend server (adjust port if necessary)
      const response = await fetch(`http://localhost:5008/ssrf-test?url=${encodeURIComponent(url)}`);
      const data = await response.text();
      setSsrfResponse(data);
    } catch (error) {
      console.error("SSRF Request Failed:", error);
      setSsrfResponse("Error fetching data");
    }
  };

  return (
    <div className="p-4 border-b bg-gray-100">
      <h2 className="text-lg font-semibold">SSRF Test</h2>
      <form onSubmit={handleSSRFTest} className="flex gap-2">
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Fetch
        </button>
      </form>
      {ssrfResponse && (
        <div className="mt-2 p-2 border rounded bg-white">
          <strong>Response:</strong>
          <pre>{ssrfResponse}</pre>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [userType, setUserType] = useState(localStorage.getItem('userType'));

  useEffect(() => {
    if (userType) {
      localStorage.setItem('userType', userType);
    } else {
      localStorage.removeItem('userType');
    }
  }, [userType]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">

          <Routes>
            <Route path="/login" element={<Login setUserType={setUserType} />} />
            <Route path="/teacherDashboard" element={userType === 'teacher' ? <TeacherDashboard /> : <Navigate to="/login" replace />} />
            <Route path="/mark-attendance" element={userType === 'teacher' ? <MarkAttendance /> : <Navigate to="/login" replace />} />
            <Route path="/add-student" element={userType === 'teacher' ? <StudentForm /> : <Navigate to="/login" replace />} />
            <Route path="/fees-status" element={userType === 'teacher' ? <FeesStatus /> : <Navigate to="/login" replace />} />
            <Route path="/view-feedback" element={userType === 'teacher' ? <ViewFeedback /> : <Navigate to="/login" replace />} />
            <Route path="/studentDashboard" element={userType === 'student' ? <StudentDashboard /> : <Navigate to="/login" replace />} />
            <Route path="/attendance" element={userType === 'student' ? <UpdateAttendance /> : <Navigate to="/login" replace />} />
            <Route path="/feedback" element={userType ? <FeedbackForm /> : <Navigate to="/login" replace />} />
            <Route path="/ssrf-test" element={userType === 'student' ? <SSRFTestComponent /> : <Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>

        <Routes>
          <Route path="/login" element={null} />
          <Route path="*" element={userType ? <Footer /> : null} />
        </Routes>
      </div>
    </Router>
  );
}
