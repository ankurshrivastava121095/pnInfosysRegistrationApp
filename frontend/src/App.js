import { Routes, Route } from "react-router-dom";
import './App.css';
import Main from "./AdminPanel/Component/Main";
import Dashboard from "./AdminPanel/Pages/Dashboard/Index";
import StudentIndex from "./AdminPanel/Pages/Student/Index";
import Navbar from "./Components/Navbar/Navbar";
import AboutIndex from "./Pages/About/Index";
import ContactUsIndex from "./Pages/ContactUs/Index";
import CoursesIndex from "./Pages/Courses/Index";
import GalleryIndex from "./Pages/Gallery/Index";
import HomeIndex from './Pages/Home/Index';
import LoginIndex from "./Pages/Login/Index";
import RegistrationForm from "./Pages/RegistrationForm/Index";
import StudentList from "./AdminPanel/Pages/Student/Components/Table";
import CourseIndexPage from "./AdminPanel/Pages/Courses/Index";
import CourseList from "./AdminPanel/Pages/Courses/Components/Table";
import ContactIsMessagesIndex from "./AdminPanel/Pages/ContactUsMessages/Index";
import SliderIndexPage from "./AdminPanel/Pages/Slider/Index";
import SliderList from "./AdminPanel/Pages/Slider/Components/Table";
import BannerIndexPage from "./AdminPanel/Pages/Banner/Index";
import BannerList from "./AdminPanel/Pages/Banner/Components/Table";
import PlacementIndex from "./Pages/Placement/Index";
import PlacementIndexPage from "./AdminPanel/Pages/Placement/Index";
import PlacementList from "./AdminPanel/Pages/Placement/Components/Table";
import CertificateIndex from "./Pages/Certificate/Index";
import CertificateIndexPage from "./AdminPanel/Pages/Certificate/Index";
import CertificateList from "./AdminPanel/Pages/Certificate/Components/Table";
import AdminRegisterIndex from "./Pages/AdminRegister/Index";
import StudentView from "./AdminPanel/Pages/Student/Components/View";
import StudentEditForm from "./AdminPanel/Pages/Student/Components/EditForm";
import CourseAddForm from "./AdminPanel/Pages/Courses/Components/AddForm";
import CourseView from "./AdminPanel/Pages/Courses/Components/View";
import CourseEditForm from "./AdminPanel/Pages/Courses/Components/EditForm";
import PlacementView from "./AdminPanel/Pages/Placement/Components/View";
import PlacementEditForm from "./AdminPanel/Pages/Placement/Components/EditForm";
import PlacementAddForm from "./AdminPanel/Pages/Placement/Components/AddForm";
import CertificateAddForm from "./AdminPanel/Pages/Certificate/Components/AddForm";
import CertificateView from "./AdminPanel/Pages/Certificate/Components/View";
import CertificateEditForm from "./AdminPanel/Pages/Certificate/Components/EditForm";
import SliderAddForm from "./AdminPanel/Pages/Slider/Components/AddForm";
import SliderView from "./AdminPanel/Pages/Slider/Components/View";
import SliderEditForm from "./AdminPanel/Pages/Slider/Components/EditForm";
import BannerAddForm from "./AdminPanel/Pages/Banner/Components/AddForm";
import BannerView from "./AdminPanel/Pages/Banner/Components/View";
import BannerEditForm from "./AdminPanel/Pages/Banner/Components/EditForm";

function App() {

  return (
    <div>
      <Routes>
        {/* Frontend */}
        <Route path="/" element={<Navbar />} >
          <Route path="/" element={<HomeIndex />} />
          <Route path="/about" element={<AboutIndex />} />
          <Route path="/courses" element={<CoursesIndex />} />
          <Route path="/placement" element={<PlacementIndex />} />
          <Route path="/certificate" element={<CertificateIndex />} />
          <Route path="/gallery" element={<GalleryIndex />} />
          <Route path="/contact-us" element={<ContactUsIndex />} />
          <Route path="/login" element={<LoginIndex />} />
          <Route path="/registerPnAdmin" element={<AdminRegisterIndex />} />
          <Route path="/register/:id" element={<RegistrationForm />} />
        </Route>

        {
          // isAuthenticated ?
          <>
            {/* Backend */}
            <Route path="/admin" element={<Main />} >
              <Route path="/admin/dashboard" element={<Dashboard />} />

              <Route path="/admin/student" element={<StudentIndex />}>
                <Route path="/admin/student/studentList" element={<StudentList />} />
                <Route path="/admin/student/studentView/:id" element={<StudentView />} />
                <Route path="/admin/student/studentEdit/:id" element={<StudentEditForm />} />
              </Route>

              <Route path="/admin/courses" element={<CourseIndexPage />}>
                <Route path="/admin/courses/addCourse" element={<CourseAddForm />} />
                <Route path="/admin/courses/coursesList" element={<CourseList />} />
                <Route path="/admin/courses/courseView/:id" element={<CourseView />} />
                <Route path="/admin/courses/courseEdit/:id" element={<CourseEditForm />} />
              </Route>

              <Route path="/admin/placement" element={<PlacementIndexPage />}>
                <Route path="/admin/placement/addPlacedStudent" element={<PlacementAddForm />} />
                <Route path="/admin/placement/placementList" element={<PlacementList />} />
                <Route path="/admin/placement/placementView/:id" element={<PlacementView />} />
                <Route path="/admin/placement/placementEdit/:id" element={<PlacementEditForm />} />
              </Route>

              <Route path="/admin/certificate" element={<CertificateIndexPage />}>
                <Route path="/admin/certificate/certificateList" element={<CertificateList />} />
                <Route path="/admin/certificate/addCertificate" element={<CertificateAddForm />} />
                <Route path="/admin/certificate/certificateView/:id" element={<CertificateView />} />
                <Route path="/admin/certificate/certificateEdit/:id" element={<CertificateEditForm />} />
              </Route>

              <Route path="/admin/slider" element={<SliderIndexPage />}>
                <Route path="/admin/slider/sliderList" element={<SliderList />} />
                <Route path="/admin/slider/addSlider" element={<SliderAddForm />} />
                <Route path="/admin/slider/sliderView/:id" element={<SliderView />} />
                <Route path="/admin/slider/sliderEdit/:id" element={<SliderEditForm />} />
              </Route>

              <Route path="/admin/banner" element={<BannerIndexPage />}>
                <Route path="/admin/banner/bannerList" element={<BannerList />} />
                <Route path="/admin/banner/addBanner" element={<BannerAddForm />} />
                <Route path="/admin/banner/bannerView/:id" element={<BannerView />} />
                <Route path="/admin/banner/bannerEdit/:id" element={<BannerEditForm />} />
              </Route>

              <Route path="/admin/messages" element={<ContactIsMessagesIndex />} />

            </Route>
          </>
          // :
          // <Route path="/login" element={<LoginIndex />} />
        }
      </Routes>
    </div>
  );
}

export default App;
