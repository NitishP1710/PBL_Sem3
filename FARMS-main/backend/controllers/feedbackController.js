const FeedbackSQL = require("../models/feedbackSQL");
const Student = require("../models/student");

// Submit feedback to SQL database
exports.submitFeedback = async (req, res) => {
    try {
        const { name, email, feedback } = req.body;

        // Verify student exists in MongoDB
        const student = await Student.findOne({ name, email });
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        // Save to SQL database
        const newFeedback = await FeedbackSQL.create(
            student._id.toString(),
            name,
            email,
            feedback
        );

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

// Retrieve feedback from SQL database
exports.getFeedback = async (req, res) => {
    try {
        const { studentId, email } = req.query;
        let feedbackData;

        if (studentId) {
            // Get feedback by MongoDB student ID
            feedbackData = await FeedbackSQL.getByStudentId(studentId);
        } else if (email) {
            // Get feedback by student email
            feedbackData = await FeedbackSQL.getByEmail(email);
        } else {
            // Get all feedback if no filters
            feedbackData = await FeedbackSQL.getAll();
        }

        res.status(200).json({
            success: true,
            message: "Feedback retrieved successfully",
            data: feedbackData
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error retrieving feedback",
            error: err.message
        });
    }
};