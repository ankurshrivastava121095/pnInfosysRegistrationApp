const CourseModel = require("../models/Course");
var cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'depjzfj9a', 
    api_key: '489915939841262', 
    api_secret: '5tBdTUHJ33XMIN3iP-49Rfeps9I',
    // secure: true
});

class CourseController{

    static addCourse = async(req,res) => {
        try{
            // console.log(req.body)
            // console.log(req.files)

            const file = req.files.courseImage
            const myClouddb = await cloudinary.uploader.upload(file.tempFilePath,{
                folder : 'blogImage'
            })

            const data = new CourseModel({
                courseName: req.body.courseName,
                databaseName: req.body.databaseName,
                databaseIcon: req.body.databaseIcon,
                databaseIconColor: req.body.databaseIconColor,
                languageOne: req.body.languageOne,
                languageTwo: req.body.languageTwo,
                languageThree: req.body.languageThree,
                languageFour: req.body.languageFour,
                languageOneIcon: req.body.languageOneIcon,
                languageTwoIcon: req.body.languageTwoIcon,
                languageThreeIcon: req.body.languageThreeIcon,
                languageFourIcon: req.body.languageFourIcon,
                languageOneIconColor: req.body.languageOneIconColor,
                languageTwoIconColor: req.body.languageTwoIconColor,
                languageThreeIconColor: req.body.languageThreeIconColor,
                languageFourIconColor: req.body.languageFourIconColor,
                duration: req.body.duration,
                fees: req.body.fees,
                description: req.body.description,
                courseImage: {
                    public_id: myClouddb.public_id,
                    url: myClouddb.secure_url,
                },
            })
            await data.save()
            if(data){
                res
                .status(201)
                .json({ status: "success", message: "Course added Successfully 😃🍻"});
            }else{
                res
                .status(400)
                .json({ status: "failed", message: "Error !"});
            }
            // console.log(req.body)
            // console.log(req.files)
            // const data = await CourseModel.create(req.body)
            // res
            // .status(201)
            // .json({ status: "success", message: "Course added Successfully 😃🍻"});
        }catch(err){
            console.log(err)
        }
    }

    static getAllCourses = async(req,res) => {
        try{
            const data = await CourseModel.find()
            res.status(201).json({
                success: true,
                data
            })
        }catch(err){
            console.log(err)
        }
    }

    static courseDetail = async(req,res) => {
        try{
            const data = await CourseModel.findById(req.params.id)
            res.status(201).json({
                success: true,
                data
            })
        }catch(err){
            console.log(err)
        }
    }
    
    static countCourse = async(req,res) => {
        try{
            const data = await CourseModel.find().count()
            res.status(200).json({
                success: true,
                data
            })
        }catch(err){
            console.log(err)
        }
    }

    static updateCourse = async(req,res) => {
        try{
            if(req.files === null){
                const { courseName, duration, fees, databaseName, languageOneIconColor, languageFourIconColor, languageThreeIconColor, languageTwoIconColor, languageOneIcon, languageTwoIcon, languageFourIcon, languageThreeIcon, databaseIcon, databaseIconColor, languageOne, languageTwo, languageThree, languageFour, description } = (req.body)
                const data = await CourseModel.findByIdAndUpdate(req.params.id,{
                    courseName: courseName,
                    databaseName: databaseName,
                    databaseIcon: databaseIcon,
                    databaseIconColor: databaseIconColor,
                    languageOne: languageOne,
                    languageTwo: languageTwo,
                    languageThree: languageThree,
                    languageFour: languageFour,
                    languageOneIcon: languageOneIcon,
                    languageTwoIcon: languageTwoIcon,
                    languageThreeIcon: languageThreeIcon,
                    languageFourIcon: languageFourIcon,
                    languageOneIconColor: languageOneIconColor,
                    languageTwoIconColor: languageTwoIconColor,
                    languageThreeIconColor: languageThreeIconColor,
                    languageFourIconColor: languageFourIconColor,
                    duration: duration,
                    fees: fees,
                    description: description,
                })
                res
                .status(201)
                .json({ status: "success", message: "Course updated Successfully 😃🍻"});
            }else{
                const { courseName, duration, fees, databaseName, languageOneIconColor, languageFourIconColor, languageThreeIconColor, languageTwoIconColor, languageOneIcon, languageTwoIcon, languageFourIcon, languageThreeIcon, databaseIcon, databaseIconColor, languageOne, languageTwo, languageThree, languageFour, description } = (req.body)
                const file = req.files.courseImage
                const myClouddb = await cloudinary.uploader.upload(file.tempFilePath,{
                    folder : 'blogImage'
                })

                const data = await CourseModel.findByIdAndUpdate(req.params.id,{
                    courseName: courseName,
                    databaseName: databaseName,
                    databaseIcon: databaseIcon,
                    databaseIconColor: databaseIconColor,
                    languageOne: languageOne,
                    languageTwo: languageTwo,
                    languageThree: languageThree,
                    languageFour: languageFour,
                    languageOneIcon: languageOneIcon,
                    languageTwoIcon: languageTwoIcon,
                    languageThreeIcon: languageThreeIcon,
                    languageFourIcon: languageFourIcon,
                    languageOneIconColor: languageOneIconColor,
                    languageTwoIconColor: languageTwoIconColor,
                    languageThreeIconColor: languageThreeIconColor,
                    languageFourIconColor: languageFourIconColor,
                    duration: duration,
                    fees: fees,
                    description: description,
                    courseImage: {
                        public_id: myClouddb.public_id,
                        url: myClouddb.secure_url,
                    },
                })
                res
                .status(201)
                .json({ status: "success", message: "Course updated Successfully 😃🍻"});
            }
            // console.log(req.files)
            // console.log(req.body)
            // const { courseName, duration, fees, databaseName, languageOneIconColor, languageFourIconColor, languageThreeIconColor, languageTwoIconColor, languageOneIcon, languageTwoIcon, languageFourIcon, languageThreeIcon, databaseIcon, databaseIconColor, languageOne, languageTwo, languageThree, languageFour, description } = (req.body)
            // const data = await CourseModel.findByIdAndUpdate(req.params.id,{
            //     courseName: courseName,
            //     databaseName: databaseName,
            //     databaseIcon: databaseIcon,
            //     databaseIconColor: databaseIconColor,
            //     languageOne: languageOne,
            //     languageTwo: languageTwo,
            //     languageThree: languageThree,
            //     languageFour: languageFour,
            //     languageOneIcon: languageOneIcon,
            //     languageTwoIcon: languageTwoIcon,
            //     languageThreeIcon: languageThreeIcon,
            //     languageFourIcon: languageFourIcon,
            //     languageOneIconColor: languageOneIconColor,
            //     languageTwoIconColor: languageTwoIconColor,
            //     languageThreeIconColor: languageThreeIconColor,
            //     languageFourIconColor: languageFourIconColor,
            //     duration: duration,
            //     fees: fees,
            //     description: description,
            // })
            // res
            // .status(201)
            // .json({ status: "success", message: "Course updated Successfully 😃🍻"});
        }catch(err){
            console.log(err)
        }
    }

    static courseDelete = async(req,res) => {
        try{
            // console.log(req.body)
            const data = await CourseModel.findByIdAndDelete(req.params.id)
            res
            .status(201)
            .json({ status: "success", message: "Course deleted Successfully 😃🍻"});
        }catch(err){
            console.log(err)
        }
    }

}
module.exports = CourseController