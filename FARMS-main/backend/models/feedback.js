const mongoose = require("mongoose");

const feedBackSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to Student model
        ref: "Student",
        required: true
    },
    feedback: {
        type: String,
        required: true
    }
});

// Export the model
module.exports = mongoose.model("Feedback", feedBackSchema);
