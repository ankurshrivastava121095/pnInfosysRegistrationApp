/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function InterviewQuestionsIndex() {

    const param = useParams()
    const courseID = param.id

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allQuestions?.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <>
            <div className="container-fuild">
                <h1 className="text-center fst-italic pt-3 mb-4 mt-5 fw-bold fs-48px"><i className="fa-solid fa-question"></i> INTERVIEW QUESTIONS</h1>
                    <div className="container p-3">
                        <div className="row mt-5 m-3">
                            <div className="accordion accordion-flush" id="accordionFlushExample">
                                {
                                    !loading ?
                                    currentItems?.map((val,key)=>(
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${key}`} aria-expanded="false" aria-controls={`flush-collapse${key}`}>
                                                    Question {key+1}. {val?.question}
                                                </button>
                                            </h2>
                                            <div id={`flush-collapse${key}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                <div className="accordion-body">{val?.answer}</div>
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
                        <div className="pagination" style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                            {Array(Math?.ceil(allQuestions?.length / itemsPerPage))?.fill()?.map((_, i) => (
                                <center>
                                    <button 
                                        style={{ width: '35px',
                                            borderRadius: '4px',
                                            background: 'darkblue',
                                            color: '#fff',
                                            border: '1px solid darkblue', 
                                        }}
                                        key={i} 
                                        onClick={() => paginate(i + 1)}
                                    >{i + 1}</button>
                                </center>
                            ))}
                        </div>
                    </div>
            </div>
        </>
    )
}

export default InterviewQuestionsIndex