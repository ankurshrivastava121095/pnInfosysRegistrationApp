/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import { createQuestion } from '../../../../Features/InterviewQuestions/InterviewQuestionSlice';
import { getAllInterviewQuestionCourses } from '../../../../Features/InterviewQuestionCourse/InterviewQuestionCourseSlice';

function InterviewQuestionAddForm() {

  const dispatch = useDispatch();

  const { questions, responseStatus, responseMessage } = useSelector(
    (state) => state.questions
  );

  const { interviewQuestionCourses } = useSelector(
    (state) => state.interviewQuestionCourses
  );

  const [loading, setLoading] = useState(true);
  const [allCourses, setAllCourses] = useState([])
  const [data, setData] = useState({
    question: '',
    answer: '',
    courseID: '',
  });

  const handleEditorChange = (content) => {
    setData({
      ...data,
      answer: content,
    });
  };

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
    dispatch(getAllInterviewQuestionCourses())
  },[])

  useEffect(() => {
    if (interviewQuestionCourses?.data && interviewQuestionCourses.data.length > 0) {
      setAllCourses(interviewQuestionCourses.data);
      setLoading(false)
    }
  }, [interviewQuestionCourses]);

  useEffect(()=>{
    if (responseStatus === 'success') {
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

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }],
      ['bold', 'italic', 'underline', 'strike'],
      ['link', 'image'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']
    ],
  };
 
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
                  {/*  */}
                  <div>
                    <label htmlFor="">Answer</label>
                    <ReactQuill
                      value={data?.answer}
                      onChange={handleEditorChange}
                    />
                    {/* <div>
                      <h3>Editor Content:</h3>
                      <div dangerouslySetInnerHTML={{ __html: editorHtml }} />
                    </div> */}
                  </div>
                  {/*  */}
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