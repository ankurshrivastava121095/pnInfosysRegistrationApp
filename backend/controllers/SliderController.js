const SliderModel = require("../models/Slider");
var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'depjzfj9a', 
    api_key: '489915939841262', 
    api_secret: '5tBdTUHJ33XMIN3iP-49Rfeps9I',
    // secure: true
});

class SliderController{
    static addSlider = async(req,res) => {
        try{
            // console.log(req.body)
            // console.log(req.files)

            const file = req.files.sliderImage
            const myClouddb = await cloudinary.uploader.upload(file.tempFilePath,{
                folder : 'blogImage'
            })

            const data = new SliderModel({
                title : req.body.title,
                sliderImage: {
                    public_id: myClouddb.public_id,
                    url: myClouddb.secure_url,
                },
            })
            await data.save()
            if(data){
                res
                .status(201)
                .json({ status: "success", message: "Slider added Successfully 😃🍻"});
            }else{
                res
                .status(400)
                .json({ status: "failed", message: "Error !"});
            }
        }catch(err){
            console.log(err)
        }
    }

    static getAllSlider = async(req,res) => {
        try{
            const data = await SliderModel.find()
            res.status(201).json({
                success: true,
                data
            })
        }catch(err){
            console.log(err)
        }
    }

    static sliderDetail = async(req,res) => {
        try{
            const data = await SliderModel.findById(req.params.id)
            res.status(201).json({
                success: true,
                data
            })
        }catch(err){
            console.log(err)
        }
    }

    static updateSlider = async(req,res) => {
        try{
            // console.log(req.body)
            // console.log(req.files)
            if(req.files === null){
                const data = await SliderModel.findByIdAndUpdate(req.params.id,{
                    title: req.body.title,
                    sliderStatus: req.body.sliderStatus,
                })
                res
                .status(201)
                .json({ status: "success", message: "Slider updated Successfully 😃🍻"});
            }else{
                const file = req.files.sliderImage
                const myClouddb = await cloudinary.uploader.upload(file.tempFilePath,{
                    folder : 'blogImage'
                })

                const data = await SliderModel.findByIdAndUpdate(req.params.id,{
                    title: req.body.title,
                    sliderStatus: req.body.sliderStatus,
                    sliderImage: {
                        public_id: myClouddb.public_id,
                        url: myClouddb.secure_url,
                    },
                })
                res
                .status(201)
                .json({ status: "success", message: "Slider updated Successfully 😃🍻"});
            }
        }catch(err){
            console.log(err)
        }
    }

    static sliderDelete = async(req,res) => {
        try{
            // console.log(req.body)
            const data = await SliderModel.findByIdAndDelete(req.params.id)
            res
            .status(201)
            .json({ status: "success", message: "Slider deleted Successfully 😃🍻"});
        }catch(err){
            console.log(err)
        }
    }
}
module.exports = SliderController