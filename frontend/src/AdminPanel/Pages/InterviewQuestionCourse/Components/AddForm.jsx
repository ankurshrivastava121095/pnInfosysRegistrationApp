/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import { createInterviewQuestionCourse } from '../../../../Features/InterviewQuestionCourse/InterviewQuestionCourseSlice';

function InterviewQuestionCourseAddForm() {

  const dispatch = useDispatch(); 

  const { interviewQuestionCourses, responseStatus, responseMessage } = useSelector(
    (state) => state.interviewQuestionCourses
  );

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    courseName: '',
  });

  const handleInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    dispatch(createInterviewQuestionCourse(data));
  };

  const showSuccessToast = (succMessage) => {
    toast.success(succMessage);
  }

  const showFailToast = (errMessage) => {
      toast.error(errMessage);
  }

  useEffect(()=>{
    if (responseStatus === 'success') {
        setLoading(false)
    }
  },[interviewQuestionCourses])

  useEffect(()=>{
    if (responseStatus === 'success' && responseMessage === 'Course created successfully') {
        setLoading(false)
        showSuccessToast(responseMessage)
    }
    if (responseStatus === 'rejected') {
        setLoading(false)
        showFailToast(responseMessage)
    }
  },[responseMessage])
 
  return (
    <>
      <div className='bg-GrayDiv'>
        <ToastContainer />
        <div className='row'>
          <div className='col-md-12 border-darkBlue p-4'>
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <div className="form-floating mb-3">
                      <input 
                        type="text" 
                        id="courseName" 
                        name='courseName' 
                        className="form-control" 
                        placeholder="Course Name"  
                        onChange={handleInput}
                        required='required' 
                      />
                      <label htmlFor="courseName" className='inputLabel'>Course Name</label>
                    </div>
                  </div>
                </div>
              </div>
              <br /><br />
              {
                loading ? (
                  <center>
                    <div className="smallLoader"></div>
                  </center>
                ):
                (
                  <button type='submit' className="btn btn-darkBlue w-100">Save</button>
                )
              }
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default InterviewQuestionCourseAddForm