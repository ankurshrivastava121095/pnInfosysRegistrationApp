const mongoose = require('mongoose');


const interviewQuestionCourseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        require: true,
    },
    isDeleted: {
        type: Number,
        require: true,
        default: 0
    },
}, { timestamps: true });


var InterviewQuestionCourseModel = mongoose.model('interviewQuestionCourses', interviewQuestionCourseSchema);
module.exports = InterviewQuestionCourseModel;