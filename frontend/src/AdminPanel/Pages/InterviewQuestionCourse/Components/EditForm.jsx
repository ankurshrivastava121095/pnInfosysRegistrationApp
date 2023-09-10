/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { getInterviewQuestionCourse, updateInterviewQuestionCourse } from '../../../../Features/InterviewQuestionCourse/InterviewQuestionCourseSlice';

function InterviewQuestionCourseEditForm() {

  const dispatch = useDispatch()
  const param = useParams()

  const interviewQuestionCourseID = param.id

  const { interviewQuestionCourses, responseStatus, responseMessage } = useSelector(
    (state) => state.interviewQuestionCourses
  );

  const [loading, setLoading] = useState(true);
  const [courseName, setCourseName] = useState('');

  const getInterviewQuestionCourseDetail = async() => {
    dispatch(getInterviewQuestionCourse(interviewQuestionCourseID))
  }
      
  useEffect(()=>{
      getInterviewQuestionCourseDetail()
  },[])

  useEffect(()=>{
    setLoading(false)
    setCourseName(interviewQuestionCourses?.data?.courseName)
  },[interviewQuestionCourses])

  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)

    const interviewQuestionCourse_Data = {
      _id: interviewQuestionCourseID,
      courseName: courseName,
    };

    dispatch(updateInterviewQuestionCourse(interviewQuestionCourse_Data));
  }

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
    if (responseStatus === 'success' && responseMessage === 'Course updated successfully') {
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
                        value={courseName}
                        onChange={(e)=>setCourseName(e.target.value)}
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
                  <button type='submit' className="btn btn-darkBlue w-100">Update</button>
                )
              }
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default InterviewQuestionCourseEditForm