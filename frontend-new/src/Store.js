import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/Auth/AuthSlice";
import certficatesReducer from "./Features/Certificate/CertificateSlice";
import contactMessagesReducer from "./Features/ContactMessage/ContactMessageSlice";
import coursesReducer from "./Features/Course/CourseSlice";
import interviewQuestionsReducer from "./Features/InterviewQuestion/InterviewQuestionSlice";
import interviewQuestionCoursesReducer from "./Features/InterviewQuestionCourse/InterviewQuestionCourseSlice";
import placementsReducer from "./Features/Placement/PlacementSlice";
import studentsReducer from "./Features/StudentRegistration/StudentRegistrationSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        certificates: certficatesReducer,
        contactMessages: contactMessagesReducer,
        courses: coursesReducer,
        interviewQuestions: interviewQuestionsReducer,
        interviewQuestionCourses: interviewQuestionCoursesReducer,
        placements: placementsReducer,
        students: studentsReducer,
    },
});