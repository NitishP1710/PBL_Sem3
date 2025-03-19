const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String, // Corrected case
        required: true, // Corrected spelling
        maxLength: 100
    },
    rollNumber: {
        type: String, 
        required: true,
        maxLength: 5
    },
    email: {
        type: String, 
        required: true, 
        maxLength: 100
    },
    contactNumber: {
        type: String, 
        required: true, 
        maxLength: 10
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
});

// Export the model
module.exports = mongoose.model('Student', studentSchema);
