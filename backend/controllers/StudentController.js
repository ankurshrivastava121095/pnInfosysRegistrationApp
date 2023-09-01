const CourseModel = require('../models/Course');
const StudentModel = require('../models/Student')

class StudentController{

    static addStudent = async(req,res) => {
        try{
            // console.log(req.body)
            const data = await StudentModel.create(req.body)
            res
            .status(201)
            .json({ status: "success", message: "Student added Successfully 😃🍻"});
        }catch(err){
            console.log(err)
        }
    }

    static getAllStudents = async(req,res) => {
        try{
            const data = await StudentModel.find().sort({_id: -1 })
            res.status(200).json({
                success: true,
                data
            })
        }catch(err){
            console.log(err)
        }
    }

    static getStudent = async(req,res) => {
        try{
            // console.log(req.params.id)
            const data = await StudentModel.findById(req.params.id)
            res.status(200).json({
                success: true,
                data
            })
        }catch(err){
            console.log(err)
        }
    }

    static countStudent = async(req,res) => {
        try{
            const data = await StudentModel.find().count()
            res.status(200).json({
                success: true,
                data
            })
        }catch(err){
            console.log(err)
        }
    }

    static updateStudent = async(req,res) => {
        try{
            // console.log(req.params.id)
            // console.log(req.body)
            const data = await StudentModel.findByIdAndUpdate(req.params.id,{
                studentName : req.body.studentName,
                email : req.body.email,
                mobileNumber : req.body.mobileNumber,
                address : req.body.address,
                gender : req.body.gender,
                college : req.body.college,
                branch : req.body.branch,
                qualification : req.body.qualification,
                semester : req.body.semester,
            })
            await data.save()
            res
            .status(201)
            .json({ status: "success", message: "Student updated Successfully 😃🍻", data});
        }catch(err){
            console.log(err)
        }
    }

    static deleteStudent = async(req,res) => {
        try{
            const data = await StudentModel.findByIdAndDelete(req.params.id)
            res
            .status(201)
            .json({ status: "success", message: "Student deleted successfully 😃🍻"});
        }catch(err){
            console.log(err)
        }
    }

}
module.exports = StudentController