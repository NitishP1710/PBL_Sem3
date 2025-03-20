const express = require("express");
const Student = require("../models/student");
const Attendance = require("../models/attendance");

const router = express.Router();

// Fetch all students
router.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
});

// Fetch attendance data
router.get("/attendance", async (req, res) => {
  try {
    const attendanceData = [
      { subject: "EM3", present: 18, total: 20 },
      { subject: "DSA", present: 12, total: 15 },
      { subject: "PPL", present: 18, total: 18 },
      { subject: "MP", present: 11, total: 21 },
      { subject: "SE", present: 2, total: 10 },
      { subject: "DSA-lab", present: 6, total: 6 },
      { subject: "MP-lab", present: 8, total: 9 },
      { subject: "PBL-lab", present: 4, total: 4 },
    ];
    res.json(attendanceData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance data", error });
  }
});

// Mark attendance for multiple students
router.post("/attendance", async (req, res) => {
  const { attendanceData } = req.body;

  if (!attendanceData || !Array.isArray(attendanceData)) {
    return res.status(400).json({ success: false, message: "Invalid attendance data" });
  }

  try {
    // Save attendance records
    await Attendance.insertMany(attendanceData);
    res.json({ success: true, message: "Attendance marked successfully" });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ success: false, message: "Failed to mark attendance" });
  }
});

// Fetch attendance for a specific student
router.get("/attendance/:rollNumber", async (req, res) => {
  const { rollNumber } = req.params;

  try {
    const attendance = await Attendance.find({ rollNumber });
    res.json(attendance);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ success: false, message: "Failed to fetch attendance" });
  }
});

// Fetch fees data
router.get("/fees", async (req, res) => {
  try {
    const feesData = [
      { studentName: "John Doe", amount: 500, status: "Paid" },
      { studentName: "Jane Smith", amount: 500, status: "Pending" },
    ];
    res.json(feesData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching fees data", error });
  }
});

// Fetch student profile
router.get("/students/:rollNumber", async (req, res) => {
  const { rollNumber } = req.params;
  try {
    const student = await Student.findOne({ rollNumber });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student profile", error });
  }
});

// Fetch class schedule
router.get("/schedule", async (req, res) => {
  try {
    const schedule = [
      { day: "Monday", time: "9:00 AM", subject: "Mathematics" },
      { day: "Tuesday", time: "10:00 AM", subject: "Science" },
    ];
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: "Error fetching class schedule", error });
  }
});

// Fetch exam results
router.get("/results", async (req, res) => {
  try {
    const results = [
      { subject: "Mathematics", marks: 85 },
      { subject: "Science", marks: 90 },
    ];
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exam results", error });
  }
});

// Fetch student results
router.get("/students/:rollNumber/results", async (req, res) => {
  const { rollNumber } = req.params;
  try {
    const results = [
      { subject: "Mathematics", marks: 85 },
      { subject: "Science", marks: 90 },
    ];
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student results", error });
  }
});

// Fetch student attendance
router.get("/students/:rollNumber/attendance", async (req, res) => {
  const { rollNumber } = req.params;
  try {
    const attendance = await Attendance.find({ rollNumber });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student attendance", error });
  }
});


//add student
router.post("/add-student", async (req, res) => {
  const { rollNumber, name, email, className, division, address, phone } = req.body;

  try {
    // Check if the student already exists
    const existingStudent = await Student.findOne({ rollNumber });
    if (existingStudent) {
      return res.status(400).json({ success: false, message: "Student with this roll number already exists" });
    }

    // Create a new student
    const newStudent = new Student({
      rollNumber,
      name,
      email,
      className,
      division,
      address,
      phone,
    });

    await newStudent.save();
    res.json({ success: true, message: "Student added successfully" });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ success: false, message: "Error adding student" });
  }
});

module.exports = router;