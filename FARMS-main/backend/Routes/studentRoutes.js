// routes/studentRoutes.js
const express = require("express");
const Student = require("../models/student");

const router = express.Router();

// Fetch all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
});

module.exports = router;