import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";  // Corrected path
import Home from "./pages/Home";    // Corrected path
import FeedbackForm from "./components/FeedbackForm";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
  
        <Route path="/home" element={<Home />} />
        <Route path='/feedback' element={<FeedbackForm/>}/>
      </Routes>
    </Router>
  );
}