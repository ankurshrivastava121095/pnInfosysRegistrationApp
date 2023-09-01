import React, { useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import '../../Assets/Style.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

const Navbar = () =>{

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const params = useParams()

    const ID = params.id

    const location = useLocation();

    const [responseMsg,setResponseMsg] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const { loading, success, message, error } = useSelector((state) => state.auth)

    useEffect(()=>{
        if(location.pathname  === '/'){
            document.title = 'PNINFOSYS | Home'
        }
        if(location.pathname  === '/about'){
            document.title = 'PNINFOSYS | About'
        }
        if(location.pathname  === '/courses'){
            document.title = 'PNINFOSYS | Courses'
        }
        if(location.pathname  === '/placement'){
            document.title = 'PNINFOSYS | Placement'
        }
        if(location.pathname  === '/certificate'){
            document.title = 'PNINFOSYS | Certificate'
        }
        if(location.pathname  === '/interviewQuestion'){
            document.title = 'PNINFOSYS | Interview Question'
        }
        if(location.pathname  === `/interviewQuestion/${ID}`){
            document.title = 'PNINFOSYS | Interview Question'
        }
        if(location.pathname  === `/register/${ID}`){
            document.title = 'PNINFOSYS | Registration'
        }
        if(location.pathname  === '/contact-us'){
            document.title = 'PNINFOSYS | Contact Us'
        }
        if(location.pathname  === '/login'){
            document.title = 'PNINFOSYS | Login'
        }
    })

    useEffect(()=>{
        const isAuthenticate = localStorage.getItem('userToken')
        // console.log(isAuthenticate);

        if (isAuthenticate != null) {
            navigate('/admin/dashboard')
        }
    },[])

    useEffect(()=>{
        if (success == true && message == 'Logged In') {
            navigate('/admin/dashboard');
        }
    },[success, message])

    useEffect(() => {
        if (success) {
            if (message) {
                setIsLoading(false)
            }
            setResponseMsg(message); // Set success message
        } else if (error) {
            setResponseMsg(error); // Set error message
        }
    }, [success, error]);

    return(
        <>
            <nav className="navbar navbar-expand-lg bg-nav">
                <div className="container-fluid">
                    {/* <Link className="navbar-brand fs-3 fw-bold" to="#"><span className="logoBlueColor">PN</span>INFO<span className="logoBlueColor">SYS</span></Link> */}
                    <Link className="navbar-brand fs-3 fw-bold" to="#">
                        <img src="https://firebasestorage.googleapis.com/v0/b/pn-images.appspot.com/o/logo%2Fcolorlogo.png?alt=media&token=0386f0aa-e1e1-4950-924f-3eedaa82d967" className='w-50 bg-white rounded' alt="" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ms-auto d-flex align-items-center">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname  === '/' ? 'text-white text-decoration-underline' : 'text-white'} fw-bold`} aria-current="page" to="/">HOME</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname  === '/about' ? 'text-white text-decoration-underline' : 'text-white'} fw-bold`} to="/about">ABOUT</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname  === '/courses' || location.pathname  === `/register/${ID}` ? 'text-white text-decoration-underline' : 'text-white'} fw-bold`} to="/courses">COURSES</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname  === '/placement' ? 'text-white text-decoration-underline' : 'text-white'} fw-bold`} to="/placement">PLACEMENT</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname  === '/certificate' ? 'text-white text-decoration-underline' : 'text-white'} fw-bold`} to="/certificate">CERTIFICATE</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname  === '/interviewQuestion' ? 'text-white text-decoration-underline' : 'text-white'} fw-bold`} to="/interviewQuestion">INTERVIEW QUESTION</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname  === '/contact-us' ? 'text-white text-decoration-underline' : 'text-white'} fw-bold`} to="/contact-us">CONTACT US</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname  === '/login' ? 'text-white text-decoration-underline' : 'text-white'} fw-bold`} to="/login">LOGIN</Link>
                        </li>
                        <li className="nav-item">
                            <a href="/" className="text-white fs-4 me-2"><i className="fa-brands fa-facebook"></i></a>
                        </li>
                        <li className="nav-item">
                            <a href="/" className="text-white fs-4 me-2"><i className="fa-brands fa-instagram"></i></a>
                        </li>
                        <li className="nav-item">
                            <a href="/" className="text-white fs-4 me-2"><i className="fa-brands fa-twitter"></i></a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
            <div className='container-fluid bg-nav'>
                <div className='row'>
                    <div className='col-md-12'>
                        <center>
                            {/* <img src="img/favIcon.png" className='' alt="" /> */}
                            <img src="https://firebasestorage.googleapis.com/v0/b/pn-images.appspot.com/o/logo%2Fcolorlogo.png?alt=media&token=0386f0aa-e1e1-4950-924f-3eedaa82d967" className='bg-white mt-3 rounded' alt="" />
                            <hr className='text-white' />
                            <div className="row">
                                <div className="col-md-4">
                                    <h6 className='text-white'><i className="fa-solid fa-envelope"></i> Email</h6>
                                    <p className='text-white'>www.pninfosys.com <br /> support@pninfosys.com</p>
                                </div>
                                <div className="col-md-4">
                                    <h6 className='text-white'><i className="fa-solid fa-phone"></i> Phone</h6>
                                    <p className='text-white'>+91 7000846823 <br /> +91 7415289378</p>
                                </div>
                                <div className="col-md-4">
                                    <h6 className='text-white'><i className="fa-solid fa-location-dot"></i> Street Address</h6>
                                    <p className='text-white'>MIG-332 Darpan Colony,Thatipur,<br /> Gwalior,Madhya Pradesh</p>
                                </div>
                            </div>
                            <hr className='text-white' />
                            <h4 className='mt-3 mb-3 text-white'>Copyright &copy; PNINFOSYS</h4>
                        </center>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Navbar