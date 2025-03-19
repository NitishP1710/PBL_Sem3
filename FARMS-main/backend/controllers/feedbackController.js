const Feedback = require("../models/feedback");
const Student = require("../models/student");

// Create Feedback for a Student
exports.getFeedback = async (req, res) => {
    try {
        const { name, email, feedback } = req.body;

        // Find the student by name and email
        const student = await Student.findOne({ name, email });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        // Create and save feedback for the student
        const newFeedback = new Feedback({
            studentId: student._id, // Reference to Student
            feedback: feedback
        });

        await newFeedback.save();

        res.status(201).json({
            success: true,
            message: "Feedback submitted successfully",
            data: newFeedback
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error submitting feedback",
            error: err.message
        });
    }
};
