/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function InterviewQuestionsIndex() {

    const param = useParams()
    const courseID = param.id

    const [allQuestions,setAllQuestions] = useState([])
    const [loading, setLoading] = useState(true)

    const getCourseDetail = async() => {
        const {data} = await axios.get(`${process.env.REACT_APP_URL_ENDPOINT}/getQuestions/${courseID}`);
        setAllQuestions(data.data)
        setLoading(false)
    }
    
    useEffect(() => {
        getCourseDetail()
    }, []);

    return (
        <>
            <div className="container-fuild">
                <h1 className="text-center fst-italic pt-3 mb-4 mt-5 fw-bold fs-48px"><i className="fa-solid fa-question"></i> INTERVIEW QUESTIONS</h1>
                    <div className="container p-3">
                        <div className="row mt-5 m-3">
                            <div className="accordion accordion-flush" id="accordionFlushExample">
                                {
                                    !loading ?
                                    Array.isArray(allQuestions) && allQuestions?.map((val,key)=>(
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${key}`} aria-expanded="false" aria-controls={`flush-collapse${key}`}>
                                                    Question {key+1}. {val?.question}
                                                </button>
                                            </h2>
                                            <div id={`flush-collapse${key}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                <div className="accordion-body">
                                                    <span className='fw-bold'>Answer:</span>
                                                    &nbsp;&nbsp;&nbsp;<div dangerouslySetInnerHTML={{ __html: val?.answer }} />
                                                </div>
                                            </div>
                                        </div>
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
            </div>
        </>
    )
}

export default InterviewQuestionsIndex