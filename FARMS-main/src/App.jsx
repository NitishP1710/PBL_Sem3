import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import Login from "./pages/Login";  
import Home from "./pages/Home";   
import FeedbackForm from "./components/FeedbackForm";
import StudentForm from "./components/StudentForm";
=======
import Login from "./pages/Login";  // Corrected path
import Home from "./pages/Home";    // Corrected path
import FeedbackForm from "./components/FeedbackForm";
>>>>>>> 9138f035f136f918b50f0957ce5342f194a8be2f

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