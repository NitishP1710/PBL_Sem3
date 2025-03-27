const express = require("express");
const router = express.Router();

// Import all controllers

const {getStudents}=require("../controllers/studentcontroller");
router.get("/students",getStudents);

const {controlAttendance}=require("../controllers/attendanceController");
router.post("/attendance",controlAttendance);
const {getFeedback}=require("../controllers/feedbackController");
router.post("/feedback",getFeedback);
// const { 
//   createStudent,
//   getStudents,
//   updateStudent,
//   deleteStudent 
// } = require("../controllers/studentcontroller");

// // const { 
// //   controlAttendance,
// //   getAttendance,
// //   updateAttendance
// // } = require("../controllers/attendanceController");

// const {
//   getFeedback,
//   createFeedback,
//   updateFeedback
// } = require("../controllers/feedbackController");

// // const {
// //   getFees,
// //   updateFees
// // } = require("../controllers/feesController");

// // Student Routes
// router.post("/students", createStudent);
// router.get("/students", getStudents);
// //router.put("/students/:id", updateStudent);
// //router.delete("/students/:id", deleteStudent);

// // Attendance Routes
// //router.post("/attendance", controlAttendance);
// //router.get("/attendance", getAttendance);
// //router.put("/attendance/:id", updateAttendance);

// // Feedback Routes
// router.get("/feedback", getFeedback);
// router.post("/feedback", createFeedback);
// router.put("/feedback/:id", updateFeedback);

// // Fees Routes
// //router.get("/fees", getFees);
// //router.put("/fees/:id", updateFees);

// module.exports = router;
module.exports = router;