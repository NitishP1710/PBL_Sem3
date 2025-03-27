// // routes/attendanceRoutes.js
// const express = require("express");
// const Attendance = require("../models/attendance");

// const router = express.Router();

// // Submit attendance
// router.post("/", async (req, res) => {
//   const { attendanceData } = req.body;

//   try {
//     await Attendance.insertMany(attendanceData);
//     res.json({ message: "Attendance submitted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error submitting attendance", error });
//   }
// });

// module.exports = router;