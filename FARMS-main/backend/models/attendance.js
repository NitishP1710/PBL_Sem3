const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  rollNumber: { type: String, required: true }, // Student's roll number
  date: { type: Date, required: true }, // Date of attendance
  status: { type: String, enum: ["present", "absent"], required: true }, // Attendance status
});

module.exports = mongoose.model("Attendance", attendanceSchema);