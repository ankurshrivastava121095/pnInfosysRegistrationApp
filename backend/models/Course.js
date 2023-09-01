const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    databaseName: {
        type: String,
    },
    databaseIcon: {
      type: String,
    },
    databaseIconColor: {
      type: String,
    },
    languageOne: {
        type: String,
    },
    languageOneIcon: {
      type: String,
    },
    languageOneIconColor: {
      type: String,
    },
    languageTwo: {
        type: String,
    },
    languageTwoIcon: {
      type: String,
    },
    languageTwoIconColor: {
      type: String,
    },
    languageThree: {
        type: String,
    },
    languageThreeIcon: {
      type: String,
    },
    languageThreeIconColor: {
      type: String,
    },
    languageFour: {
        type: String,
    },
    languageFourIcon: {
      type: String,
    },
    languageFourIconColor: {
      type: String,
    },
    duration: {
      type: String,
    },
    fees: {
      type: Number,
    },
    description: {
        type: String,
    },
    courseImage: {
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


var CourseModel = mongoose.model('courses', courseSchema);
module.exports = CourseModel;