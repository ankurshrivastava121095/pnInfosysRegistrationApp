/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllInterviewQuestionCourses } from '../../Features/InterviewQuestionCourse/InterviewQuestionCourseSlice'

function InterviewQuestionIndex() {

    const dispatch = useDispatch()

    const[allCourses,setAllCourses] = useState([])
    const [loading, setLoading] = useState(true)

    const { interviewQuestionCourses, responseStatus, responseMessage } = useSelector(
        (state) => state.interviewQuestionCourses
    );

    const fetchAllCourses = () => {
        dispatch(getAllInterviewQuestionCourses()); 
    }

    useEffect(()=>{
        if (interviewQuestionCourses?.data && interviewQuestionCourses.data.length > 0) {
            console.log(interviewQuestionCourses?.data);
            setAllCourses(interviewQuestionCourses.data);
        }
        setLoading(false)
    },[interviewQuestionCourses])

    useEffect(()=>{
        if (responseStatus === 'success') {
            setLoading(false)
        }
    },[interviewQuestionCourses])
    
    useEffect(() => {
        fetchAllCourses();
    }, []);

    return (
        <>
            <div className="container-fuild">
                <h1 className="text-center fst-italic pt-3 mb-4 mt-5 fw-bold fs-48px"><i className="fa-solid fa-question"></i> INTERVIEW QUESTIONS</h1>
                    <div className="container p-3">
                        <div className="row mt-5 m-3">
                            {
                                !loading ?
                                Array.isArray(allCourses) && allCourses?.map((val,key)=>(
                                    <>
                                        <div key={key} className='d-flex flex-wrap justify-content-between'>
                                            <h5>{val?.courseName}</h5>
                                            <Link to={`/interviewQuestion/${val?._id}`}>Interview Questions</Link>
                                        </div>
                                        <hr />
                                    </>
                                ))
                                :
                                <>
                                    <center>
                                        <div className="loader"></div>
                                    </center>
                                </>
                            }
                        </div>
                    </div>
            </div>
        </>
    )
}

export default InterviewQuestionIndex