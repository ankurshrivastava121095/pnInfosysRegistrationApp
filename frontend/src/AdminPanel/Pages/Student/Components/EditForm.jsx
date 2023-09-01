/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { getStudent, updateStudent } from '../../../../Features/Students/StudentSlice';

function StudentEditForm() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const param = useParams()
    const studentID = param.id

    const { students, responseStatus, responseMessage } = useSelector(
        (state) => state.students
    );

    const fields = {
        studentName: '',
        email: '',
        mobileNumber: '',
        address: '',
        gender: '',
        college: '',
        branch: '',
        qualification: '',
        semester: '',
    }

    const [data, setData] = useState({fields})
    const [loading, setLoading] = useState(true)

    const getData = () => {
        dispatch(getStudent(studentID));
    }
    
    useEffect(() => {
        getData()
    }, []);

    useEffect(()=>{
        setData(students?.data)
        setLoading(false)
    },[students])

    useEffect(()=>{
        if (responseStatus === 'success') {
            setLoading(false)
            showSuccessToast(responseMessage)
        }
        if (responseStatus === 'rejected') {
            setLoading(false)
            showFailToast(responseMessage)
        }
    },[responseMessage])

    const handleInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        dispatch(updateStudent(data));
    }

    const showSuccessToast = (succMessage) => {
        toast.success(succMessage);
    }

    const showFailToast = (errMessage) => {
        toast.error(errMessage);
    }

    return (
        <>
            <div className='bg-GrayDiv'>
                <ToastContainer />
                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-0">
                        <input 
                        type="text" 
                        id="studentName" 
                        name='studentName' 
                        className="form-control" 
                        placeholder="Student Name" 
                        onChange={handleInput} 
                        required='required' 
                        value={data?.studentName}
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
                                    className="form-control" 
                                    placeholder="Student Email" 
                                    onChange={handleInput}  
                                    required='required' 
                                    value={data?.email}
                                    />
                                    <label htmlFor="email" className='inputLabel'>Student Email</label>
                                </div>
                                <small className='mb-3 ms-2'>We"ll never share your email with anyone else.</small>
                            </div>
                            <div className='col-md-4'>
                                <div className="form-floating mb-3">
                                    <input 
                                    type="text" 
                                    id="mobileNumber" 
                                    name='mobileNumber' 
                                    className="form-control" 
                                    placeholder="Student Mobile Number" 
                                    onChange={handleInput}  
                                    required='required' 
                                    value={data?.mobileNumber}
                                    />
                                    <label htmlFor="mobileNumber" className='inputLabel'>Student Mobile Number</label>
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
                            onChange={handleInput}  
                            required='required' 
                            value={data?.address}
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
                                        id='male' 
                                        value='Male' 
                                        checked={data?.gender === 'Male' ? <>checked</> : ''}
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
                                        name='gender' 
                                        id='female' 
                                        value='Female' 
                                        checked={data?.gender === 'Female' ? <>checked</> : ''}
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
                                    value={data?.college} 
                                    onChange={handleInput} 
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
                                    value={data?.branch}  
                                    onChange={handleInput}
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
                                    value={data?.qualification}  
                                    onChange={handleInput} 
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
                                    className='customized-select-dropdown' 
                                    value={data?.semester}  
                                    onChange={handleInput} 
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
                        !loading ?
                            <button type='submit' className='btn btn-darkBlue w-100'>Update</button>
                        :
                        <center>
                            <div className="smallLoader"></div>
                        </center>
                    }
                </form>
            </div>
        </>
    )
}

export default StudentEditForm