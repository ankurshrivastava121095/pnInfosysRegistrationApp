/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { createStudent } from '../../Features/Students/StudentSlice'

function RegistrationForm() {

    const dispatch = useDispatch();

    const { students, responseStatus, responseMessage } = useSelector(
        (state) => state.students
    );

    const params = useParams()
    const courseID = params.id

    var fields = {
        studentName : '',
        email : '',
        mobileNumber : '',
        address : '',
        gender : '',
        college : '',
        branch : '',
        qualification : '',
        semester : '',
        courseId : '',
    }

    const [formData, setFormData] = useState(fields)
    const [msg, setMsg] = useState(false)
    const [banner, setBanner] = useState()
    const [courseData, setCourseData] = useState([])
    const [courseName, setCourseName] = useState()
    const [loading, setLoading] = useState(false)
    const [showResponse, setShowResponse] = useState(false)
    const [responseText, setResponseText] = useState('')
    const [responseTextColor, setResponseTextColor] = useState('')

    const handleInput = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
            courseId:courseName
        });
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        setLoading(true)
        
        // dispatch(createStudent(formData));
    }

    useEffect(()=>{
        if (responseMessage == 'Student created successfully') {
            setLoading(false)
            setShowResponse(true)   
            setResponseText('You have Registered Successfully We will get in touch with you soon !')
            setResponseTextColor('success')  
        } 
        if (responseStatus == 'rejected') {
            setLoading(false)
            setShowResponse(true)   
            setResponseText('Something went wrong, Try again !')
            setResponseTextColor('danger')  
        }
    },[students, responseMessage])

    // 

    const getCourseDetail = async() => {
        const {data} = await axios.get(`http://localhost:5000/api/pn/courseDetail/${courseID}`);
        // console.log(data.data)
        setCourseData(data.data)
    }

    const getActiveBanner = async() => {
        const {data} = await axios.get(`http://localhost:5000/api/pn/getActiveBanner`);
        console.log(data.data.bannerImage.url)
        setBanner(data.data.bannerImage.url)
    }
        
    useEffect(()=>{
        getCourseDetail()
        getActiveBanner()
    },[])

    
    useEffect(()=>{
        setCourseName(courseData.courseName)
    })

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <h1 className='text-center mt-5 fst-italic'>Register Now</h1>
                    <div className='col-md-6 mt-4 mb-5'>
                        {/* <img src={banner} className='w-100' alt="" /> */}
                        <img src={courseData?.courseImage?.url} className='w-100' alt="" />
                    </div>
                    <div className='col-md-6 mt-4 mb-5'>
                        <div className='border border-dark stylish-rounded shadow p-3'>
                            <form onSubmit={handleSubmit}>
                                <input type="hidden" name='courseId' value={courseID} />
                                <div className="form-floating mb-0">
                                    <input 
                                    type="text" 
                                    id="studentName" 
                                    name='studentName' 
                                    value={formData?.studentName}
                                    className="form-control" 
                                    placeholder="Student Name" 
                                    onChange={handleInput}
                                    required='required' 
                                    />
                                    <label htmlFor="studentName" className='inputLabel'>Student Name</label>
                                </div>
                                <div className='mb-0'>
                                    <div className='row'>
                                        <div className='col-md-8'>
                                            <div className="form-floating">
                                                <input 
                                                type="text" 
                                                id="email" 
                                                name='email' 
                                                value={formData?.email}
                                                className="form-control" 
                                                placeholder="Email" 
                                                onChange={handleInput}
                                                required='required' 
                                                />
                                                <label htmlFor="email" className='inputLabel'>Email</label>
                                            </div>
                                            <small className='mb-3 ms-2'>We"ll never share your email with anyone else.</small>
                                        </div>
                                        <div className='col-md-4'>
                                            <div className="form-floating mb-3">
                                                <input 
                                                type="text" 
                                                id="mobileNumber" 
                                                name='mobileNumber' 
                                                value={formData?.mobileNumber}
                                                className="form-control" 
                                                placeholder="Mobile Number" 
                                                onChange={handleInput}
                                                required='required' 
                                                />
                                                <label htmlFor="mobileNumber" className='inputLabel'>Mobile Number</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-floating mb-3">
                                    <textarea 
                                        type="text"
                                        id="address" 
                                        name='address' 
                                        className="form-control h-100px" 
                                        placeholder="Address" 
                                        value={formData?.address}
                                        onChange={handleInput}
                                        required='required' 
                                    >
                                    </textarea>
                                    <label htmlFor="address" className='inputLabel'>Address</label>
                                </div>
                                <div className='mb-3 pt-0'>
                                    <label>Gender</label><br />
                                    <div className='row'>
                                        <div className='col-md-3'>
                                            <div>
                                                <label role='button' htmlFor="male">Male</label>
                                                <input
                                                    type="radio" 
                                                    role='button' 
                                                    className='form-check-input ms-3' 
                                                    name='gender' 
                                                    checked={formData?.gender === 'Male' ? 'checked' : ''}
                                                    id='male' 
                                                    value='Male' 
                                                    onChange={handleInput}
                                                    />
                                            </div>
                                        </div>
                                        <div className='col-md-9'>
                                            <div>
                                                <label role='button' htmlFor="female">Female</label>
                                                <input 
                                                    type="radio" 
                                                    role='button' 
                                                    className='form-check-input ms-3' 
                                                    checked={formData?.gender === 'Female' ? 'checked' : ''}
                                                    name='gender' 
                                                    id='female' 
                                                    value='Female' 
                                                    onChange={handleInput}
                                                    />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='mb-3'>
                                    <div className='row'>
                                        <div className='col-md-8'>
                                            <select 
                                                name="college" 
                                                id="college" 
                                                className='customized-select-dropdown'
                                                onChange={handleInput}
                                                required='required'
                                                value={formData?.college}
                                            >
                                                <option value="">----- Select College -----</option>
                                                <option value="RJIT">RJIT</option>
                                                <option value="SHRIRAM COLLEGE OF ENGINEERING AND MANAGEMENT">SHRIRAM COLLEGE OF ENGINEERING AND MANAGEMENT</option>
                                                <option value="MPCT">MPCT</option>
                                                <option value="MITS">MITS</option>
                                                <option value="ITM">ITM</option>
                                                <option value="OTHERS">OTHERS</option>
                                            </select>
                                        </div>
                                        <div className='col-md-4'>
                                            <select 
                                                name="branch" 
                                                id="branch" 
                                                className='customized-select-dropdown' 
                                                onChange={handleInput}
                                                required='required'
                                                value={formData?.branch}
                                            >
                                                <option value="">----- Select Branch -----</option>
                                                <option value="CSE">CSE</option>
                                                <option value="IT">IT</option>
                                                <option value="EE">EE</option>
                                                <option value="EC">EC</option>
                                                <option value="MECHANICAL">MECHANICAL</option>
                                                <option value="CIVIL">CIVIL</option>
                                                <option value="AUTOMOBILE">AUTOMOBILE</option>
                                                <option value="OTHERS">OTHERS</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='mb-3'>
                                    <div className='row'>
                                        <div className='col-md-8'>
                                            <select 
                                                name="qualification" 
                                                id="qualification" 
                                                className='customized-select-dropdown' 
                                                onChange={handleInput}
                                                required='required'
                                                value={formData?.qualification}
                                            >
                                                <option value="">----- Select Qualification -----</option>
                                                <option value="B.TECH">B.TECH</option>
                                                <option value="BCA">BCA</option>
                                                <option value="MCA">MCA</option>
                                                <option value="B.SC.">B.SC.</option>
                                                <option value="OTHERS">OTHERS</option>
                                            </select>
                                        </div>
                                        <div className='col-md-4'>
                                            <select 
                                                name="semester" 
                                                id="semester" 
                                                value={formData?.semester}
                                                className='customized-select-dropdown' 
                                                onChange={handleInput}
                                                required='required'
                                            >
                                                <option value="">----- Select Semester -----</option>
                                                <option value="First">First</option>
                                                <option value="Second">Second</option>
                                                <option value="Third">Third</option>
                                                <option value="Fourth">Fourth</option>
                                                <option value="Fifth">Fifth</option>
                                                <option value="Sixth">Sixth</option>
                                                <option value="Seventh">Seventh</option>
                                                <option value="Eighth">Eighth</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                {
                                    showResponse ?
                                    <><div className={`text-${responseTextColor} border border-${responseTextColor} rounded fw-bold rounded p-2 mt-3`}>{responseText}</div></>
                                    :
                                    ''
                                }
                                {
                                    !loading ?
                                        <button type='submit' className='btn btn-lightBlue w-100'>Register</button>
                                    :
                                        <center>
                                            <div className="smallLoader"></div>
                                        </center>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegistrationForm