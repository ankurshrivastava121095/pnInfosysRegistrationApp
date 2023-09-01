/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { getQuestion, updateQuestion } from '../../../../Features/InterviewQuestions/InterviewQuestionSlice';

function InterviewQuestionEditForm() {

  const dispatch = useDispatch()
  const param = useParams()

  const questionID = param.id

  const { questions, responseStatus, responseMessage } = useSelector(
    (state) => state.questions
  );

  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const getInterviewQuestionDetail = async() => {
    dispatch(getQuestion(questionID))
  }
      
  useEffect(()=>{
      getInterviewQuestionDetail()
  },[])

  useEffect(()=>{
    setLoading(false)
    setQuestion(questions?.data?.question)
    setAnswer(questions?.data?.answer)
  },[questions])

  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)

    const interviewQuestion_Data = {
      _id: questionID,
      question: question,
      answer: answer,
    };

    dispatch(updateQuestion(interviewQuestion_Data));
  }

  const showSuccessToast = (succMessage) => {
    toast.success(succMessage);
  }

  const showFailToast = (errMessage) => {
      toast.error(errMessage);
  }

  useEffect(()=>{
    if (responseStatus == 'success') {
        setLoading(false)
    }
  },[questions])

  useEffect(()=>{
    if (responseStatus === 'success' && responseMessage === 'Question updated successfully') {
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
                        value={question}
                        onChange={(e)=>setQuestion(e.target.value)}
                        required='required' 
                      />
                      <label htmlFor="question" className='inputLabel'>Question</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='mb-3'>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <div className="form-floating mb-3">
                      <textarea 
                        id="answer" 
                        name='answer' 
                        className="form-control" 
                        placeholder="Answer" 
                        value={answer}
                        onChange={(e)=>setAnswer(e.target.value)}
                        required='required' 
                      ></textarea>
                      <label htmlFor="answer" className='inputLabel'>Answer</label>
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

export default InterviewQuestionEditForm