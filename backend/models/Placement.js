const mongoose = require('mongoose');


const placementSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    company: {
        type: String,
    },
    designation: {
        type: String,
    },
    placedStudentImage: {
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


var PlacementModel = mongoose.model('placements', placementSchema);
module.exports = PlacementModel;