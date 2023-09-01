const BannerModel = require("../models/Banner");
var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'depjzfj9a', 
    api_key: '489915939841262', 
    api_secret: '5tBdTUHJ33XMIN3iP-49Rfeps9I',
    // secure: true
});

class BannerController{
    static addBanner = async(req,res) => {
        try{
            // console.log(req.body)
            // console.log(req.files)
            
            const isOneDataExist = await BannerModel.find().limit(1)
            if (isOneDataExist == []) {
                const file = req.files.bannerImage
                const myClouddb = await cloudinary.uploader.upload(file.tempFilePath,{
                    folder : 'blogImage'
                })

                const data = new BannerModel({
                    title : req.body.title,
                    bannerImage: {
                        public_id: myClouddb.public_id,
                        url: myClouddb.secure_url,
                    },
                })
                await data.save()
                if(data){
                    res
                    .status(201)
                    .json({ status: "success", message: "Banner added Successfully 😃🍻"});
                }else{
                    res
                    .status(400)
                    .json({ status: "failed", message: "Error !"});
                }
            } else {
                const deactivePrev = await BannerModel.updateMany({bannerStatus:'Deactive'})

                if (deactivePrev) {
                    const file = req.files.bannerImage
                    const myClouddb = await cloudinary.uploader.upload(file.tempFilePath,{
                        folder : 'blogImage'
                    })

                    const data = new BannerModel({
                        title : req.body.title,
                        bannerImage: {
                            public_id: myClouddb.public_id,
                            url: myClouddb.secure_url,
                        },
                    })
                    await data.save()
                    if(data){
                        res
                        .status(201)
                        .json({ status: "success", message: "Banner added Successfully 😃🍻"});
                    }else{
                        res
                        .status(400)
                        .json({ status: "failed", message: "Error !"});
                    }
                } else {
                    res
                    .status(400)
                    .json({ status: "failed", message: "Banner did not add"});
                }
            }
        }catch(err){
            console.log(err)
        }
    }

    static getAllBanner = async(req,res) => {
        try{
            const data = await BannerModel.find()
            res.status(201).json({
                success: true,
                data
            })
        }catch(err){
            console.log(err)
        }
    }

    static bannerDetail = async(req,res) => {
        try{
            const data = await BannerModel.findById(req.params.id)
            res.status(201).json({
                success: true,
                data
            })
        }catch(err){
            console.log(err)
        }
    }

    static getActiveBanner = async(req,res) => {
        try{
            const data = await BannerModel.findOne({bannerStatus:'Active'})
            res.status(201).json({
                success: true,
                data
            })
        }catch(err){
            console.log(err)
        }
    }

    static updateBanner = async(req,res) => {
        try{
            // console.log(req.body)
            // console.log(req.files)
            if(req.files === null){

                const isOneDataExist = await BannerModel.find().limit(1)
                if (isOneDataExist == []) {
                    const data = await BannerModel.findByIdAndUpdate(req.params.id,{
                        title: req.body.title,
                        bannerStatus: req.body.bannerStatus,
                    })
                    res
                    .status(201)
                    .json({ status: "success", message: "Banner updated Successfully 😃🍻"});
                }else{
                    const deactivePrev = await BannerModel.updateMany({bannerStatus:'Deactive'})
                    if (deactivePrev) {
                        const data = await BannerModel.findByIdAndUpdate(req.params.id,{
                            title: req.body.title,
                            bannerStatus: req.body.bannerStatus,
                        })
                        res
                        .status(201)
                        .json({ status: "success", message: "Banner updated Successfully 😃🍻"});
                    } else {
                        res
                        .status(400)
                        .json({ status: "failed", message: "Banner did not update"});
                    }
                }
            }else{
                const file = req.files.bannerImage
                const myClouddb = await cloudinary.uploader.upload(file.tempFilePath,{
                    folder : 'blogImage'
                })

                const data = await BannerModel.findByIdAndUpdate(req.params.id,{
                    title: req.body.title,
                    bannerStatus: req.body.bannerStatus,
                    bannerImage: {
                        public_id: myClouddb.public_id,
                        url: myClouddb.secure_url,
                    },
                })
                res
                .status(201)
                .json({ status: "success", message: "Banner updated Successfully 😃🍻"});
            }
        }catch(err){
            console.log(err)
        }
    }

    static bannerDelete = async(req,res) => {
        try{
            // console.log(req.body)
            const data = await BannerModel.findByIdAndDelete(req.params.id)
            res
            .status(201)
            .json({ status: "success", message: "Banner deleted Successfully 😃🍻"});
        }catch(err){
            console.log(err)
        }
    }
}
module.exports = BannerController