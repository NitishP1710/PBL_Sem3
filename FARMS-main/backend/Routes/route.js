const express = require("express");
const router = express.Router();

// Corrected import paths
const { createStudent,getStudents } = require("../controllers/studentcontroller");
const { controlAttendance } = require("../controllers/attendanceController");
const {getFeedback} = require("../controllers/feedbackController")

// Define routes
router.post("/createStudent", createStudent);
router.post("/markAttendance", controlAttendance);
router.post("/feedback",getFeedback)
router.get("/getStudents",getStudents)

module.exports = router;
