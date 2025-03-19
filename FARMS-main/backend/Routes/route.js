const express = require("express");
const router = express.Router();

// Corrected import paths
const { createStudent } = require("../controllers/studentcontroller");
const { controlAttendance } = require("../controllers/attendanceController");
const {getFeedback} = require("../controllers/feedbackController")

// Define routes
router.post("/createStudent", createStudent);
router.post("/markAttendance", controlAttendance);
router.post("/feedback",getFeedback)

module.exports = router;
