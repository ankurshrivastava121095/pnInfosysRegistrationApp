import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import { getCourses } from '../../../../Features/Courses/CourseSlice';
import { createQuestion } from '../../../../Features/InterviewQuestions/InterviewQuestionSlice';

function InterviewQuestionAddForm() {

  const dispatch = useDispatch();

  const { questions, responseStatus, responseMessage } = useSelector(
    (state) => state.questions
  );

  const { courses } = useSelector(
    (state) => state.courses
  );

  const [loading, setLoading] = useState(true);
  const [allCourses, setAllCourses] = useState([])
  const [data, setData] = useState({
    question: '',
    answer: '',
    courseID: '',
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

    dispatch(createQuestion(data));
  };

  const showSuccessToast = (succMessage) => {
    toast.success(succMessage);
  }

  const showFailToast = (errMessage) => {
      toast.error(errMessage);
  }

  useEffect(()=>{
    dispatch(getCourses())
  },[])

  useEffect(() => {
    if (courses?.data && courses.data.length > 0) {
      setAllCourses(courses.data);
      setLoading(false)
    }
  }, [courses]);

  useEffect(()=>{
    if (responseStatus == 'success') {
        setLoading(false)
    }
  },[questions])

  useEffect(()=>{
    if (responseStatus === 'success' && responseMessage === 'Question created successfully') {
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
                        id="question" 
                        name='question' 
                        className="form-control" 
                        placeholder="Question"  
                        onChange={handleInput}
                        required='required' 
                      />
                      <label htmlFor="question" className='inputLabel'>Question</label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-floating mb-3">
                      <textarea  
                        id="answer" 
                        name='answer' 
                        className="form-control" 
                        placeholder="Answer"  
                        onChange={handleInput}
                        required='required' 
                      ></textarea>
                      <label htmlFor="answer" className='inputLabel'>Answer</label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-floating mb-3">
                      <select  
                        id="courseID" 
                        name='courseID' 
                        className="form-select" 
                        placeholder="Course"  
                        onChange={handleInput}
                        required='required' 
                      >
                        <option value="">---- Select Course ----</option>
                        {
                          !loading ?
                            Array.isArray(allCourses) && allCourses?.map((val,key)=>(
                              <option value={val?._id}>{val?.courseName}</option>
                            ))
                          :
                          <center>
                            <div className="smallLoader"></div>
                          </center>
                        }
                      </select>
                      <label htmlFor="courseID" className='inputLabel'>Course</label>
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

export default InterviewQuestionAddForm