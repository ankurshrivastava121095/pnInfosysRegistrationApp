const ContactUsMessageModel = require("../models/ContactUseMessage");

class ContactUsMessageController{

    static addMessage = async(req,res) => {
        try{
            // console.log(req.body)
            const data = await ContactUsMessageModel.create(req.body)
            res
            .status(201)
            .json({ status: "success", message: "Message sent Successfully 😃🍻"});
        }catch(err){
            console.log(err)
        }
    }

    static getAllMessages = async(req,res) => {
        try{
            // console.log(req.body)
            const data = await ContactUsMessageModel.find().sort({sort:-1})
            res.status(201).json({
                success: true,
                data
            })
        }catch(err){
            console.log(err)
        }
    }

    static messageDetail = async(req,res) => {
        try{
            const data = await ContactUsMessageModel.findById(req.params.id)
            res.status(201).json({
                success: true,
                data
            })
        }catch(err){
            console.log(err)
        }
    }
        
    static countMessage = async(req,res) => {
        try{
            const data = await ContactUsMessageModel.find().count()
            res.status(200).json({
                success: true,
                data
            })
        }catch(err){
            console.log(err)
        }
    }

}
module.exports = ContactUsMessageController