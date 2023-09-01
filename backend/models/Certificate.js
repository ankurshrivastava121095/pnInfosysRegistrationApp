const mongoose = require('mongoose');


const certificateSchema = new mongoose.Schema({
    studentName: {
        type: String,
    },
    courseName: {
        type: String,
    },
    courseDuration: {
        type: String,
    },
    certificateLink: {
        type: String,
    },
    certificateImage: {
        public_id: {
          type: String,
          required: true
        },
        url: {
          type: String,
          required: true
        },
    },
}, { timestamps: true });


var CertificateModel = mongoose.model('certificates', certificateSchema);
module.exports = CertificateModel;