import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { userLogout } from '../../Features/Auth/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'

function Main() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const param = useParams()
    const urlParam = param.id

    const { auth, loading, success, message, error } = useSelector((state) => state.auth)

    const currentYear = new Date().getFullYear()

    const [handleSidebarToggle, setHandleSidebarToggle] = useState(false)
    const [user, setUser] = useState()
    const [pageName, setPageName] = useState('')

    const sidebarToggler = () => {
        setHandleSidebarToggle(!handleSidebarToggle)
        if(handleSidebarToggle === true){
            document.getElementById("mySidebar").style.width = "250px";
            document.getElementById("main").style.marginLeft = "250px";
        }
        if(handleSidebarToggle === false){
            document.getElementById("mySidebar").style.width = "0";
            document.getElementById("main").style.marginLeft= "0";
        }
    }

    const location = useLocation();

    useEffect(()=>{
        // dashboard module starts
        if(location.pathname === '/admin/dashboard'){
            setPageName('Dashboard')
            document.title = 'PNINFOSYS | Dashboard'
        }
        // dashboard module ends
        
        // student module starts
        if(location.pathname === '/admin/student/studentList'){
            setPageName('Student List')
            document.title = 'PNINFOSYS | Student List'
        }
        if(location.pathname === `/admin/student/studentView/${urlParam}`){
            setPageName('Student View')
            document.title = 'PNINFOSYS | Student View'
        }
        if(location.pathname === `/admin/student/studentEdit/${urlParam}`){
            setPageName('Student Edit')
            document.title = 'PNINFOSYS | Student Edit'
        }
        // student module ends

        // course module starts
        if(location.pathname === '/admin/courses/coursesList'){
            setPageName('Courses List')
            document.title = 'PNINFOSYS | Courses List'
        }
        if(location.pathname === '/admin/courses/addCourse'){
            setPageName('Add Course')
            document.title = 'PNINFOSYS | Add Course'
        }
        if(location.pathname === `/admin/courses/courseView/${urlParam}`){
            setPageName('Course View')
            document.title = 'PNINFOSYS | Course View'
        }
        if(location.pathname === `/admin/courses/courseEdit/${urlParam}`){
            setPageName('Course Edit')
            document.title = 'PNINFOSYS | Course Edit'
        }
        // course module ends

        // placement module starts
        if(location.pathname === '/admin/placement/placementList'){
            setPageName('Placed Student List')
            document.title = 'PNINFOSYS | Placed Student List'
        }
        if(location.pathname === '/admin/placement/addPlacedStudent'){
            setPageName('Add Placed Student')
            document.title = 'PNINFOSYS | Add Placed Student'
        }
        if(location.pathname === `/admin/placement/placementView/${urlParam}`){
            setPageName('Placement View')
            document.title = 'PNINFOSYS | Placement View'
        }
        if(location.pathname === `/admin/placement/placementEdit/${urlParam}`){
            setPageName('Placement Edit')
            document.title = 'PNINFOSYS | Placement Edit'
        }
        // placement module ends

        // certificate module starts
        if(location.pathname === '/admin/certificate/certificateList'){
            setPageName('Certificate List')
            document.title = 'PNINFOSYS | Certificate List'
        }
        if(location.pathname === '/admin/certificate/addCertificate'){
            setPageName('Add Certificate')
            document.title = 'PNINFOSYS | Add Certificate'
        }
        if(location.pathname === `/admin/certificate/certificateView/${urlParam}`){
            setPageName('Certificate View')
            document.title = 'PNINFOSYS | Certificate View'
        }
        if(location.pathname === `/admin/certificate/certificateEdit/${urlParam}`){
            setPageName('Certificate Edit')
            document.title = 'PNINFOSYS | Certificate Edit'
        }
        // certificate module ends

        // message module starts
        if(location.pathname === '/admin/messages'){
            setPageName('Messages List')
            document.title = 'PNINFOSYS | Messages List'
        }
        // message module ends

        // slider module starts
        if(location.pathname === '/admin/slider/sliderList'){
            setPageName('Slider List')
            document.title = 'PNINFOSYS | Slider List'
        }
        if(location.pathname === '/admin/slider/addSlider'){
            setPageName('Add Slider')
            document.title = 'PNINFOSYS | Add Slider'
        }
        if(location.pathname === `/admin/slider/sliderView/${urlParam}`){
            setPageName('Slider View')
            document.title = 'PNINFOSYS | Slider View'
        }
        if(location.pathname === `/admin/slider/sliderEdit/${urlParam}`){
            setPageName('Slider Edit')
            document.title = 'PNINFOSYS | Slider Edit'
        }
        // slider module ends

        // banner module starts
        if(location.pathname === '/admin/banner/bannerList'){
            setPageName('Banner List')
            document.title = 'PNINFOSYS | Banner List'
        }
        if(location.pathname === '/admin/banner/addBanner'){
            setPageName('Add Banner')
            document.title = 'PNINFOSYS | Add Banner'
        }
        if(location.pathname === `/admin/banner/bannerView/${urlParam}`){
            setPageName('Banner View')
            document.title = 'PNINFOSYS | Banner View'
        }
        if(location.pathname === `/admin/banner/bannerEdit/${urlParam}`){
            setPageName('Banner Edit')
            document.title = 'PNINFOSYS | Banner Edit'
        }
        // banner module ends
    },[location])

    const handleLogout = () => {
        dispatch(userLogout())
        navigate('/')
    }

    useEffect(()=>{
        const token = localStorage.getItem('userToken')
        if (token == null) {
            navigate('/login')
        } else {
            const userStringData = localStorage.getItem('userData')
            const userData = JSON.parse(userStringData)
            setUser(userData)
        }
    },[])

    useEffect(()=>{
        if (success == true && message == 'Logged Out') {
            navigate('/login');
        }
    },[success])

    return (
        <>
            {/* <div id="mySidebar" className="sidebar custom-shadow"> */}
            <div id="mySidebar" className="sidebar">
                <h3 className='text-center text-white'>PNINFOSYS</h3>
                <br />
                <hr className='text-lightblue m-2' />
                <Link to="/admin/dashboard" className={`${location.pathname === '/admin/dashboard' ? 'fw-bold text-white' : ''} text-lightblue`}><i className="fa-solid fa-gauge-high"></i> Dashboard <i className={`fa-solid fa-chevron-right ${location.pathname === '/admin/dashboard' ? 'd-block' : 'd-none'}`} style={{float: "right", marginRight: "10px", marginTop: "5px"}}></i></Link>
                <hr className='text-lightblue m-2' />
                <Link to="/admin/student/studentList" className={`${location.pathname === '/admin/student/studentList' || location.pathname === '/admin/student/studentView' || location.pathname === '/admin/student/studentEditForm' ? 'fw-bold text-white' : ''} text-lightblue`}><i className="fa-solid fa-graduation-cap"></i> Students <i className={`fa-solid fa-chevron-right ${location.pathname === '/admin/student/studentList' || location.pathname === '/admin/student/studentView' || location.pathname === '/admin/student/studentEditForm' ? 'd-block' : 'd-none'}`} style={{float: "right", marginRight: "10px", marginTop: "5px"}}></i></Link>
                <hr className='text-lightblue m-2' />
                <Link to="/admin/courses/coursesList" className={`${location.pathname === '/admin/courses/coursesList' || location.pathname === '/admin/courses/courseView' || location.pathname === '/admin/courses/courseEditForm' || location.pathname === '/admin/courses/courseAdd' ? 'fw-bold text-white' : ''} text-lightblue`}><i className="fa-solid fa-code"></i> Courses <i className={`fa-solid fa-chevron-right ${location.pathname === '/admin/courses/coursesList' || location.pathname === '/admin/courses/courseView' || location.pathname === '/admin/courses/courseEditForm' || location.pathname === '/admin/courses/courseAdd' ? 'd-block' : 'd-none'}`} style={{float: "right", marginRight: "10px", marginTop: "5px"}}></i></Link>
                <hr className='text-lightblue m-2' />
                <Link to="/admin/placement/placementList" className={`${location.pathname === '/admin/placement/placementList' || location.pathname === '/admin/placement/placementView' || location.pathname === '/admin/placement/placementEditForm' || location.pathname === '/admin/placement/placementAdd' ? 'fw-bold text-white' : ''} text-lightblue`}><i className="fa-solid fa-users"></i> Placement <i className={`fa-solid fa-chevron-right ${location.pathname === '/admin/placement/placementList' || location.pathname === '/admin/placement/placementView' || location.pathname === '/admin/placement/placementEditForm' || location.pathname === '/admin/placement/placementAdd' ? 'd-block' : 'd-none'}`} style={{float: "right", marginRight: "10px", marginTop: "5px"}}></i></Link>
                <hr className='text-lightblue m-2' />
                <Link to="/admin/certificate/certificateList" className={`${location.pathname === '/admin/certificate/certificateList' || location.pathname === '/admin/certificate/certificateView' || location.pathname === '/admin/certificate/certificateEditForm' || location.pathname === '/admin/certificate/certificateAdd' ? 'fw-bold text-white' : ''} text-lightblue`}><i className="fa-solid fa-award"></i> Certificate <i className={`fa-solid fa-chevron-right ${location.pathname === '/admin/certificate/certificateList' || location.pathname === '/admin/certificate/certificateView' || location.pathname === '/admin/certificate/certificateEditForm' || location.pathname === '/admin/certificate/certificateAdd' ? 'd-block' : 'd-none'}`} style={{float: "right", marginRight: "10px", marginTop: "5px"}}></i></Link>
                <hr className='text-lightblue m-2' />
                <Link to="/admin/messages" className={`${location.pathname === '/admin/messages' ? 'fw-bold text-white' : ''} text-lightblue`}><i className="fa-solid fa-message"></i> Messages <i className={`fa-solid fa-chevron-right ${location.pathname === '/admin/messages' ? 'd-block' : 'd-none'}`} style={{float: "right", marginRight: "10px", marginTop: "5px"}}></i></Link>
                <hr className='text-lightblue m-2' />
                <Link to="/admin/slider/sliderList" className={`${location.pathname === '/admin/slider/sliderList' ? 'fw-bold text-white' : ''} text-lightblue`}><i className="fa-solid fa-images"></i> Slider <i className={`fa-solid fa-chevron-right ${location.pathname === '/admin/slider/sliderList' ? 'd-block' : 'd-none'}`} style={{float: "right", marginRight: "10px", marginTop: "5px"}}></i></Link>
                <hr className='text-lightblue m-2' />
                <Link to="/admin/banner/bannerList" className={`${location.pathname === '/admin/banner/bannerList' ? 'fw-bold text-white' : ''} text-lightblue`}><i className="fa-regular fa-file-lines"></i> Banner <i className={`fa-solid fa-chevron-right ${location.pathname === '/admin/banner/bannerList' ? 'd-block' : 'd-none'}`} style={{float: "right", marginRight: "10px", marginTop: "5px"}}></i></Link>
                <hr className='text-lightblue m-2' />







                {/* logout button */}
                <div className='logoutMenu mb-3 w-100'>
                    <hr className='text-lightblue m-2' />
                    <Link className='text-white' onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i> Logout</Link>
                </div>
            </div>

            <div id="main">
                {/* <div className='bg-lightblue adminPanelHeader adminPanelHeaderShadow d-flex flex-wrap align-items-baseline justify-content-between'> */}
                <div className='bg-lightblue adminPanelHeader adminPanelHeaderShadow d-flex align-items-baseline'>
                    <button className="openbtn ms-1" onClick={sidebarToggler}>☰</button>
                    <h5 className='me-3 ms-3 text-darkBlue fst-italic fw-bold text-center'>Welcome {user?.name} !</h5>
                </div>
                <h2 className='ms-3 m-70px mb-0'>{pageName}</h2>
                <div className='m-3'>
                    <Outlet />
                    <br /><br />
                </div>
                <div className='bg-lightblue adminPanelFooter bt-darkBlue mt-5'>
                    <center><span className='fs-4 text-darkBlue'>Copyright &copy; <span className='fw-bold'>PNINFOSYS </span>{currentYear}</span></center>
                </div>
            </div>
        </>
    )
}

export default Main