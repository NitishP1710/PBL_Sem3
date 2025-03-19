const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to Student model
        ref: "Student",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["Present", "Absent", "Late"], // Allowed values
        required: true
    }
});

// Export the model
module.exports = mongoose.model("Attendance", attendanceSchema);
