const InterviewQuestionModel = require("../models/InterviewQuestion");
const InterviewQuestionCourseModel = require("../models/InterviewQuestionCourse");

class InterviewQuestionController{

    static addQuestion = async(req,res) => {
        try{
            const { question, answer, courseID } = req.body
            const course = await InterviewQuestionCourseModel.findOne({ _id: courseID })
            const data = new InterviewQuestionModel({
                question: question,
                answer: answer,
                courseID: courseID,
                courseName: course.courseName
            })
            const dataSaved = data.save()

            if (dataSaved) {
                res
                .status(201)
                .json({ status: "success", message: "Question Added Successfully 😃🍻"});
            } else {
                res
                .status(401)
                .json({ status: "failed", message: "Error, Try Again"});
            }
        }catch(err){
            console.log(err)
        }
    }

    static getAllQuestions = async(req,res) => {
        try{
            const data = await InterviewQuestionModel.find().sort({ _id: -1 })
            res.status(201).json({
                success: true,
                data
            })
        }catch(err){
            console.log(err)
        }
    }

    static getQuestions = async(req,res) => {
        try{
            const courseID = req.params.id
            const data = await InterviewQuestionModel.find({ courseID: courseID }).sort({ _id: -1 })
            res.status(201).json({
                success: true,
                data
            })
        }catch(err){
            console.log(err)
        }
    }

    static getQuestion = async(req,res) => {
        try{
            const data = await InterviewQuestionModel.findById(req.params.id)
            res.status(201).json({
                success: true,
                data
            })
        }catch(err){
            console.log(err)
        }
    }

    static updateQuestion = async(req,res) => {
        try{
            const data = await InterviewQuestionModel.findByIdAndUpdate(req.params.id,{
                question: req.body.question,
                answer: req.body.answer,
            })
            res
            .status(201)
            .json({ status: "success", message: "Question Updated Successfully 😃🍻"});
        }catch(err){
            console.log(err)
        }
    }
        
    static questionDelete = async(req,res) => {
        try{
            const data = await InterviewQuestionModel.findByIdAndDelete(req.params.id)
            res
            .status(201)
            .json({ status: "success", message: "Question Deleted Successfully 😃🍻"});
        }catch(err){
            console.log(err)
        }
    }

}
module.exports = InterviewQuestionController