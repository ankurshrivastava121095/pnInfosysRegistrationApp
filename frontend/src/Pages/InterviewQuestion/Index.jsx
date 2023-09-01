/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCourses } from '../../Features/Courses/CourseSlice'
import { Link } from 'react-router-dom'

function InterviewQuestionIndex() {

    const dispatch = useDispatch()

    const[allCourses,setAllCourses] = useState([])
    const [loading, setLoading] = useState(true)

    const { courses, responseStatus, responseMessage } = useSelector(
        (state) => state.courses
    );

    const fetchAllCourses = () => {
        dispatch(getCourses());
    }

    useEffect(()=>{
        if (courses?.data && courses.data.length > 0) {
            console.log(courses?.data);
            setAllCourses(courses.data);
        }
        setLoading(false)
    },[courses])

    useEffect(()=>{
        if (responseStatus == 'success') {
            setLoading(false)
        }
    },[courses])
    
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
                                        <div className='d-flex flex-wrap justify-content-between'>
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