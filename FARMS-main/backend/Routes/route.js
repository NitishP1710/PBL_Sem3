const express = require("express");
const router = express.Router();

// Import controllers
const { getStudents } = require("../controllers/studentController");
const { 
  controlAttendance,
  getAttendance 
} = require("../controllers/attendanceController");
const { 
  submitFeedback,
  getFeedback 
} = require("../controllers/feedbackController");

// Student Routes
router.get("/students", getStudents);

// Attendance Routes
router.post("/attendance", controlAttendance);
router.get("/getattendance", getAttendance);

// Feedback Routes
router.post("/feedback", submitFeedback);  // Changed from getFeedback to submitFeedback
router.get("/feedback", getFeedback);      // Added to retrieve feedback if needed

module.exports = router;