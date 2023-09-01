const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    courseId: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    mobileNumber: {
        type: Number,
    },
    address: {
        type: String,
    },
    gender: {
        type: String,
    },
    college: {
        type: String,
    },
    branch: {
        type: String,
    },
    qualification: {
        type: String,
    },
    semester: {
        type: String,
    },
}, { timestamps: true });


var productModel = mongoose.model('students', studentSchema);
module.exports = productModel;