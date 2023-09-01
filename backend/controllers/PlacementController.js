const PlacementModel = require("../models/Placement")
var cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'depjzfj9a', 
    api_key: '489915939841262', 
    api_secret: '5tBdTUHJ33XMIN3iP-49Rfeps9I',
    // secure: true
});



class PlacementController{
    static addPlacedStudent = async(req,res) => {
        try{
            // console.log(req.body)
            // console.log(req.files)

            const file = req.files.placedStudentImage
            const myClouddb = await cloudinary.uploader.upload(file.tempFilePath,{
                folder : 'blogImage'
            })

            const data = new PlacementModel({
                name : req.body.name,
                company : req.body.company,
                designation : req.body.designation,
                placedStudentImage: {
                    public_id: myClouddb.public_id,
                    url: myClouddb.secure_url,
                },
            })
            await data.save()
            if(data){
                res
                .status(201)
                .json({ status: "success", message: "Student added Successfully 😃🍻"});
            }else{
                res
                .status(400)
                .json({ status: "failed", message: "Error !"});
            }
        }catch(err){
            console.log(err)
        }
    }

    static getAllPlacedStudents = async(req,res) => {
        try{
            const data = await PlacementModel.find()
            res.status(201).json({
                success: true,
                data
            })
        }catch(err){
            console.log(err)
        }
    }

    static placedStudentsDetail = async(req,res) => {
        try{
            const data = await PlacementModel.findById(req.params.id)
            res.status(201).json({
                success: true,
                data
            })
        }catch(err){
            console.log(err)
        }
    }

    static updatePlacedStudent = async(req,res) => {
        try{
            // console.log(req.body)
            // console.log(req.files)
            if(req.files === null){
                const data = await PlacementModel.findByIdAndUpdate(req.params.id,{
                    name: req.body.name,
                    company: req.body.company,
                    designation: req.body.designation,
                })
                res
                .status(201)
                .json({ status: "success", message: "Student updated Successfully 😃🍻"});
            }else{
                const file = req.files.placedStudentImage
                const myClouddb = await cloudinary.uploader.upload(file.tempFilePath,{
                    folder : 'blogImage'
                })

                const data = await PlacementModel.findByIdAndUpdate(req.params.id,{
                    name: req.body.name,
                    company: req.body.company,
                    designation: req.body.designation,
                    placedStudentImage: {
                        public_id: myClouddb.public_id,
                        url: myClouddb.secure_url,
                    },
                })
                res
                .status(201)
                .json({ status: "success", message: "Student updated Successfully 😃🍻"});
            }
        }catch(err){
            console.log(err)
        }
    }

    static placedStudentDelete = async(req,res) => {
        try{
            // console.log(req.body)
            const data = await PlacementModel.findByIdAndDelete(req.params.id)
            res
            .status(201)
            .json({ status: "success", message: "Student deleted Successfully 😃🍻"});
        }catch(err){
            console.log(err)
        }
    }
}
module.exports = PlacementController