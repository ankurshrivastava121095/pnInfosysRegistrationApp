const CertificateModel = require("../models/Certificate")
var cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'depjzfj9a', 
    api_key: '489915939841262', 
    api_secret: '5tBdTUHJ33XMIN3iP-49Rfeps9I',
    // secure: true
});



class CertificateController{
    static addCertificate = async(req,res) => {
        try{
            // console.log(req.body)
            // console.log(req.files)

            const file = req.files.certificateImage
            const myClouddb = await cloudinary.uploader.upload(file.tempFilePath,{
                folder : 'blogImage'
            })

            const data = new CertificateModel({
                studentName : req.body.studentName,
                courseName : req.body.courseName,
                courseDuration : req.body.courseDuration,
                certificateLink : req.body.certificateLink,
                certificateImage: {
                    public_id: myClouddb.public_id,
                    url: myClouddb.secure_url,
                },
            })
            await data.save()
            if(data){
                res
                .status(201)
                .json({ status: "success", message: "Certificate added Successfully 😃🍻"});
            }else{
                res
                .status(400)
                .json({ status: "failed", message: "Error !"});
            }
        }catch(err){
            console.log(err)
        }
    }

    static getAllCertificate = async(req,res) => {
        try{
            const data = await CertificateModel.find()
            res.status(201).json({
                success: true,
                data
            })
        }catch(err){
            console.log(err)
        }
    }

    static certificateDetail = async(req,res) => {
        try{
            const data = await CertificateModel.findById(req.params.id)
            res.status(201).json({
                success: true,
                data
            })
        }catch(err){
            console.log(err)
        }
    }

    static updateCertificate = async(req,res) => {
        try{
            // console.log(req.body)
            // console.log(req.files)
            if(req.files === null){
                const data = await CertificateModel.findByIdAndUpdate(req.params.id,{
                    studentName : req.body.studentName,
                    courseName : req.body.courseName,
                    courseDuration : req.body.courseDuration,
                    certificateLink : req.body.certificateLink,
                })
                res
                .status(201)
                .json({ status: "success", message: "Student updated Successfully 😃🍻"});
            }else{
                const file = req.files.certificateImage
                const myClouddb = await cloudinary.uploader.upload(file.tempFilePath,{
                    folder : 'blogImage'
                })

                const data = await CertificateModel.findByIdAndUpdate(req.params.id,{
                    studentName : req.body.studentName,
                    courseName : req.body.courseName,
                    courseDuration : req.body.courseDuration,
                    certificateLink : req.body.certificateLink,
                    certificateImage: {
                        public_id: myClouddb.public_id,
                        url: myClouddb.secure_url,
                    },
                })
                res
                .status(201)
                .json({ status: "success", message: "Certificate updated Successfully 😃🍻"});
            }
        }catch(err){
            console.log(err)
        }
    }

    static certificateDelete = async(req,res) => {
        try{
            // console.log(req.body)
            const data = await CertificateModel.findByIdAndDelete(req.params.id)
            res
            .status(201)
            .json({ status: "success", message: "Certificate deleted Successfully 😃🍻"});
        }catch(err){
            console.log(err)
        }
    }
}
module.exports = CertificateController