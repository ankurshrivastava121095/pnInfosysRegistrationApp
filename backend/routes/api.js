const { ChangeUserAuth, AuthRoles } = require('../middleware/Auth')
const express = require('express')
const BannerController = require('../controllers/BannerController')
const ContactUsMessageController = require('../controllers/ContactUsMessageController')
const CourseController = require('../controllers/CourseController')
const PlacementController = require('../controllers/PlacementController')
const SliderController = require('../controllers/SliderController')
const StudentController = require('../controllers/StudentController')
const UserController = require('../controllers/UserController')
const DashboardController = require('../controllers/DashboardController')
const CertificateController = require('../controllers/CertificateController')
const InterviewQuestionController = require('../controllers/InterviewQuestionController')
const InterviewQuestionCourseController = require('../controllers/InterviewQuestionCourseController')
const router = express.Router()



//UserController API Route
router.post('/register',UserController.registerUser)
router.post('/loginUser',UserController.loginUser)
router.post('/updatePassword',ChangeUserAuth,UserController.updatePassword)
router.get('/logout',UserController.logout)
router.get('/me',ChangeUserAuth,UserController.getUserDetail)

//StudentController
router.post('/addStudent',StudentController.addStudent)
router.get('/getAllStudents',StudentController.getAllStudents)
router.get('/getStudent/:id',StudentController.getStudent)
router.get('/countStudent',StudentController.countStudent)
router.put('/updateStudent/:id',StudentController.updateStudent)
router.delete('/deleteStudent/:id',StudentController.deleteStudent)

//CourseController
router.post('/addCourse',CourseController.addCourse)
router.get('/getAllCourses',CourseController.getAllCourses)
router.get('/courseDetail/:id',CourseController.courseDetail)
router.get('/countCourse',CourseController.countCourse)
router.put('/updateCourse/:id',CourseController.updateCourse)
router.delete('/courseDelete/:id',CourseController.courseDelete)


//ContactUsMessageModel
router.post('/addMessage',ContactUsMessageController.addMessage)
router.get('/getAllMessages',ContactUsMessageController.getAllMessages)
router.get('/messageDetail/:id',ContactUsMessageController.messageDetail)
router.get('/countMessage',ContactUsMessageController.countMessage)


//SliderController
router.post('/addSlider',SliderController.addSlider)
router.get('/getAllSlider',SliderController.getAllSlider)
router.get('/sliderDetail/:id',SliderController.sliderDetail)
router.put('/updateSlider/:id',SliderController.updateSlider)
router.delete('/sliderDelete/:id',SliderController.sliderDelete)


//PlacementController
router.post('/addPlacedStudent',PlacementController.addPlacedStudent)
router.get('/getAllPlacedStudents',PlacementController.getAllPlacedStudents)
router.get('/placedStudentsDetail/:id',PlacementController.placedStudentsDetail)
router.put('/updatePlacedStudent/:id',PlacementController.updatePlacedStudent)
router.delete('/placedStudentDelete/:id',PlacementController.placedStudentDelete)


//CertificateController
router.post('/addCertificate',CertificateController.addCertificate)
router.get('/getAllCertificate',CertificateController.getAllCertificate)
router.get('/certificateDetail/:id',CertificateController.certificateDetail)
router.put('/updateCertificate/:id',CertificateController.updateCertificate)
router.delete('/certificateDelete/:id',CertificateController.certificateDelete)


//BannerController
router.post('/addBanner',BannerController.addBanner)
router.get('/getAllBanner',BannerController.getAllBanner)
router.get('/getActiveBanner',BannerController.getActiveBanner)
router.get('/bannerDetail/:id',BannerController.bannerDetail)
router.put('/updateBanner/:id',BannerController.updateBanner)
router.delete('/bannerDelete/:id',BannerController.bannerDelete)


//InterviewQuestionController
router.post('/addQuestion',InterviewQuestionController.addQuestion)
router.get('/getAllQuestions',InterviewQuestionController.getAllQuestions)
router.get('/getQuestions/:id',InterviewQuestionController.getQuestions)
router.get('/getQuestion/:id',InterviewQuestionController.getQuestion)
router.put('/updateQuestion/:id',InterviewQuestionController.updateQuestion)
router.delete('/questionDelete/:id',InterviewQuestionController.questionDelete)


//InterviewQuestionCourseController
router.post('/addInterviewQuestionCourse',InterviewQuestionCourseController.addInterviewQuestionCourse)
router.get('/getInterviewQuestionCourses',InterviewQuestionCourseController.getInterviewQuestionCourses)
router.get('/getInterviewQuestionCourse/:id',InterviewQuestionCourseController.getInterviewQuestionCourse)
router.put('/updateInterviewQuestionCourse/:id',InterviewQuestionCourseController.updateInterviewQuestionCourse)
router.delete('/interviewQuestionCourseDelete/:id',InterviewQuestionCourseController.interviewQuestionCourseDelete)

// DashboardController
router.get('/count',DashboardController.count)










module.exports = router