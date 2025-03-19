import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";  
import Home from "./pages/Home";   
import FeedbackForm from "./components/FeedbackForm";
import StudentForm from "./components/StudentForm";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/feedback" element={<FeedbackForm/>}/>
        <Route path="/add-student" element={<StudentForm/>}/>
        <Route path="/home" element={<Home />} />
        <Route path='/feedback' element={<FeedbackForm/>}/>
      </Routes>
    </Router>
  );
}