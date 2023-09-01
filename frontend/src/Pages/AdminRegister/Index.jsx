import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createContact } from "../../Features/Contacts/ContactSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../Features/Auth/AuthSlice";

const AdminRegisterIndex = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { auth, responseStatus, responseMessage } = useSelector(
        (state) => state.auth
    );

    var fields = {
        name : '',
        email : '',
        password : '',
        conPassword : '',
    }

    const [data,setData] = useState(fields)
    const [isLoading, setIsLoading] = useState(false)
    const [responseMsg,setResponseMsg] = useState()
    
    const { loading, success, message, error } = useSelector((state) => state.auth)

    const handleInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        dispatch(registerUser(data))
    }

    useEffect(()=>{
        const isAuthenticate = localStorage.getItem('userToken')
        // console.log(isAuthenticate);

        if (isAuthenticate != null) {
            navigate('/admin/dashboard')
        }
    },[])

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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <img src="https://doi-ds.org/images/upload/contact_us.jpg" className="w-100" alt="" />
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 mt-5'>
                        <h6><i className="fa-solid fa-envelope"></i> Email</h6>
                        <p>www.pninfosys.com <br /> support@pninfosys.com</p><br />
                        <h6><i className="fa-solid fa-phone"></i> Phone</h6>
                        <p>+91 7000846823 <br /> +91 7415289378</p><br />
                        <h6><i className="fa-solid fa-location-dot"></i> Street Address</h6>
                        <p>MIG-332 Darpan Colony,Thatipur, Gwalior,Madhya Pradesh</p>
                    </div>
                    <div className='col-md-6 mt-4 mb-5 border border-dark stylish-rounded shadow p-4'>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-field mb-4">
                                            <input 
                                                type="text" 
                                                id="name" 
                                                name="name" 
                                                className='input-text-field' 
                                                required 
                                                onChange={handleInput}
                                            />
                                            <label htmlFor="name" className='label-text'>Name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-field mb-4">
                                            <input 
                                                type="text" 
                                                id="email" 
                                                name="email" 
                                                className='input-text-field' 
                                                required 
                                                onChange={handleInput}
                                            />
                                            <label htmlFor="email" className='label-text'>Email</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="input-field mb-4">
                                <input 
                                    type="text" 
                                    id="password" 
                                    name="password" 
                                    className='input-text-field' 
                                    required 
                                    onChange={handleInput}
                                />
                                <label htmlFor="password" className='label-text'>Password</label>
                            </div>
                            <div className="input-field mb-4">
                                <input 
                                    type="text" 
                                    id="conPassword" 
                                    name="conPassword" 
                                    className='input-text-field' 
                                    required 
                                    onChange={handleInput}
                                />
                                <label htmlFor="conPassword" className='label-text'>Confirm Password</label>
                            </div>
                            <br />
                            {
                                responseMsg && 
                                <div className={`alert alert-${success ? 'success' : 'danger'}`} role="alert">
                                    {
                                        success ?
                                        <i className="fa-solid fa-circle-check"></i>
                                        :
                                        <i className="fa-solid fa-triangle-exclamation"></i>
                                    }
                                    &nbsp;{responseMsg}
                                </div>
                            }
                            {
                                isLoading ?
                                <>
                                    <center>
                                        <div className="smallLoader"></div>
                                    </center>
                                </>
                                :
                                    <button type='button' className='btn btn-lightBlue mt-4 w-100' onClick={handleSubmit}>Register</button>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AdminRegisterIndex