// Mark Attendance
const Student = require("../models/student");
const Attendance = require("../models/attendance");

exports.controlAttendance = async (req, res) => {
    try {
        const { rollNumber, date, status } = req.body;

        // Find the student by rollNumber
        const student = await Student.findOne({ rollNumber });
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        // Check if attendance is already marked for the date
        const existingAttendance = await Attendance.findOne({
            rollNumber,
            date: new Date(date)
        });

        if (existingAttendance) {
            return res.status(400).json({
                success: false,
                message: "Attendance already marked for this date"
            });
        }

        // Create and save attendance
        const attendance = new Attendance({
            rollNumber,  // Ensure rollNumber is passed
            date: new Date(date),
            status
        });

        await attendance.save();

        res.status(201).json({
            success: true,
            message: "Attendance marked successfully",
            data: attendance
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error marking attendance",
            error: err.message
        });
    }
};
