const mongoose = require('mongoose');


const bannerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    bannerStatus: {
        type: String,
        required: true,
        default: 'Active'
    },
    bannerImage: {
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


var BannerModel = mongoose.model('banners', bannerSchema);
module.exports = BannerModel;