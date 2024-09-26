import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Front/Login'
import Home from '../Pages/Front/Home'
import About from '../Pages/Front/About'
import Courses from '../Pages/Front/Course/Courses'
import CourseRegistration from '../Pages/Front/Course/CourseRegistration'
import CourseListForInterviewQuestion from '../Pages/Front/InterviewQuestion/CourseList'
import InterviewQuestion from '../Pages/Front/InterviewQuestion/InterviewQuestion'
import Certificates from '../Pages/Front/Certificates'
import ContactUs from '../Pages/Front/ContactUs'
import DashboardIndex from '../Pages/Auth/Dashboard/Index'
import CourseList from '../Pages/Auth/Courses/List'
import AddCourse from '../Pages/Auth/Courses/Add'
import CertificateList from '../Pages/Auth/Certificates/List'
import AddCertificate from '../Pages/Auth/Certificates/Add'
import Placements from '../Pages/Front/Placements'
import StudentRegistrationList from '../Pages/Auth/StudentRegistrations/List'

const Routing = () => {
    return (
        <>
            <Routes>
                {/* Guest Routes */}
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/courses' element={<Courses />} />
                <Route path='/course-registration/:id' element={<CourseRegistration />} />
                <Route path='/course-list-for-interview-question' element={<CourseListForInterviewQuestion />} />
                <Route path='/interview-question/:id' element={<InterviewQuestion />} />
                <Route path='/certificates' element={<Certificates />} />
                <Route path='/placements' element={<Placements />} />
                <Route path='/contact-us' element={<ContactUs />} />
                <Route path='/login' element={<Login />} />

                {/* Protected Routes */}
                {/* Dashboard */}
                <Route path='/pn/dashboard' element={<DashboardIndex />} />
                {/* Course */}
                <Route path='/pn/courses' element={<CourseList />} />
                <Route path='/pn/add-course' element={<AddCourse />} />
                {/* Registration */}
                <Route path='/pn/student-registration' element={<StudentRegistrationList />} />
                {/* Certificate */}
                <Route path='/pn/certificates' element={<CertificateList />} />
                <Route path='/pn/add-certificate' element={<AddCertificate />} />
            </Routes>
        </>
    )
}

export default Routing