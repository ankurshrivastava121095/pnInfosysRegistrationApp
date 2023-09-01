const mongoose = require('mongoose');


const sliderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    sliderStatus: {
        type: String,
        required: true,
        default: 'Active'
    },
    sliderImage: {
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


var SliderModel = mongoose.model('sliders', sliderSchema);
module.exports = SliderModel;