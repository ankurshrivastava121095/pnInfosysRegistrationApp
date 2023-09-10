const InterviewQuestionCourseModel = require("../models/InterviewQuestionCourse");

class InterviewQuestionCourseController{

    static addInterviewQuestionCourse = async(req,res) => {
        try{
            const { courseName } = req.body
            const data = new InterviewQuestionCourseModel({
                courseName: courseName,
            })
            const dataSaved = data.save()

            if (dataSaved) {
                res
                .status(201)
                .json({ status: "success", message: "Course Added Successfully 😃🍻"});
            } else {
                res
                .status(401)
                .json({ status: "failed", message: "Error, Try Again"});
            }
        }catch(err){
            console.log(err)
        }
    }

    static getInterviewQuestionCourses = async(req,res) => {
        try{
            const data = await InterviewQuestionCourseModel.find({ isDeleted: 0 }).sort({ _id: -1 })
            res.status(201).json({
                success: true,
                data
            })
        }catch(err){
            console.log(err)
        }
    }

    static getInterviewQuestionCourse = async(req,res) => {
        try{
            const data = await InterviewQuestionCourseModel.findById(req.params.id)
            res.status(201).json({
                success: true,
                data
            })
        }catch(err){
            console.log(err)
        }
    }

    static updateInterviewQuestionCourse = async(req,res) => {
        try{
            const data = await InterviewQuestionCourseModel.findByIdAndUpdate(req.params.id,{
                courseName: req.body.courseName,
            })
            res
            .status(201)
            .json({ status: "success", message: "Course Updated Successfully 😃🍻"});
        }catch(err){
            console.log(err)
        }
    }
        
    static interviewQuestionCourseDelete = async(req,res) => {
        try{
            const data = await InterviewQuestionCourseModel.findByIdAndUpdate(req.params.id,{
                isDeleted: 1,
            })
            if (data) {
                res
                .status(201)
                .json({ status: "success", message: "Course Deleted Successfully 😃🍻"});
            } else {
                res
                .status(401)
                .json({ status: "failed", message: "Error, Try Again"});
            }
        }catch(err){
            console.log(err)
        }
    }

}
module.exports = InterviewQuestionCourseController