const ContactUsMessageModel = require('../models/ContactUseMessage');
const CourseModel = require('../models/Course');
const StudentModel = require('../models/Student')

class DashboardController{

    static count = async(req,res) => {
        try{
            const studentCount = await StudentModel.find().count()
            const courseCount = await CourseModel.find().count()
            const messageCount = await ContactUsMessageModel.find().count()

            const data = ({
                studentCount,
                courseCount,
                messageCount
            })

            res.status(200).json({
                success: true,
                data
            })
        }catch(err){
            console.log(err)
        }
    }

}
module.exports = DashboardController