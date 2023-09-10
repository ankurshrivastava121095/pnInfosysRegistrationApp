/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getQuestion } from '../../../../Features/InterviewQuestions/InterviewQuestionSlice';

function InterviewQuestionCourseView() {

    const dispatch = useDispatch()

    const param = useParams()
    const questionID = param.id

    const { questions, responseStatus, responseMessage } = useSelector(
        (state) => state.questions
    );

    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)

    const getData = () => {
        dispatch(getQuestion(questionID));
    }
    
    useEffect(() => {
        getData()
    }, []);

    useEffect(()=>{
        setData(questions?.data)
        setLoading(false)
    },[questions])

    return (
        <>
            <div className='bg-GrayDiv'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div>
                            {
                                !loading ?
                                <>
                                    <p className='fw-bold'>Course - {data?.courseName}</p>
                                    <br /><br />
                                    <p className='fw-bold'>Question - {data?.question}</p>
                                    <p>Answer - {data?.answer}</p>
                                </>
                                :
                                    <center>
                                        <div className="loader"></div>
                                    </center>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InterviewQuestionCourseView