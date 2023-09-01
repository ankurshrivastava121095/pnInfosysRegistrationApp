import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/Auth/AuthSlice";
import coursesReducer from "./Features/Courses/CourseSlice.js";
import contactsReducer from "./Features/Contacts/ContactSlice.js";
import placementsReducer from "./Features/Placements/PlacementSlice.js";
import bannersReducer from "./Features/Banners/BannerSlice.js";
import certificatesReducer from "./Features/Certifications/CertificationSlice.js";
import slidersReducer from "./Features/Sliders/SliderSlice.js";
import studentsReducer from "./Features/Students/StudentSlice.js";
import countsReducer from "./Features/Dashboard/DashboardSlice";
import questionsReducer from "./Features/InterviewQuestions/InterviewQuestionSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        courses: coursesReducer,
        contacts: contactsReducer,
        placements: placementsReducer,
        banners: bannersReducer,
        certificates: certificatesReducer,
        sliders: slidersReducer,
        students: studentsReducer,
        counts: countsReducer,
        questions: questionsReducer,
    },
});