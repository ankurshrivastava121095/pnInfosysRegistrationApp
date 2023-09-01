const mongoose = require('mongoose');


const interviewQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
    },
    answer: {
        type: String,
    },
    courseID: {
        type: String,
    },
    courseName: {
        type: String,
    },
}, { timestamps: true });


var InterviewQuestionModel = mongoose.model('interviewQuestions', interviewQuestionSchema);
module.exports = InterviewQuestionModel;