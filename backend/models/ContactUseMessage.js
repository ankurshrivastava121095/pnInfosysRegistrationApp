const mongoose = require('mongoose');


const contactUsMessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    },
}, { timestamps: true });


var ContactUsMessageModel = mongoose.model('contactusemessages', contactUsMessageSchema);
module.exports = ContactUsMessageModel;