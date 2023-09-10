/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCertificates } from '../../Features/Certifications/CertificationSlice'

function CertificateIndex() {

    const dispatch = useDispatch()

    const itemPerPage = 4

    const [currentPage, setCurrentPage] = useState(1)
    const[allCertificate,setAllCertificate] = useState([])
    const [loading, setLoading] = useState(true)

    const startIndex = (currentPage - 1) * itemPerPage
    const endIndex = startIndex + itemPerPage
    const displayData = allCertificate?.slice(startIndex, endIndex)

    const { certificates, responseStatus, responseMessage } = useSelector(
        (state) => state.certificates
    );

    const getAllCertificates = () => {
        dispatch(getCertificates());
    }

    useEffect(()=>{
        if (certificates?.data && certificates.data.length > 0) {
            setAllCertificate(certificates?.data)
        }
    },[certificates])

    useEffect(()=>{
        if (responseStatus === 'success') {
            setLoading(false)
        }
    },[allCertificate])
    
    useEffect(() => {
        getAllCertificates();
    }, []);

    return (
        <>
            <div className="container-fuild">
                <h1 className="text-center fst-italic pt-3 mb-4 mt-5 fw-bold fs-48px"><i className="fa-solid fa-award"></i> OUR CERTIFIED STUDENTS</h1>
                    <div className="container p-3">
                        <div className="row mt-5 m-3">
                            {
                                !loading ?
                                <>
                                    {    
                                        Array.isArray(displayData) && displayData?.map((val,key)=>(
                                            <div className="col-md-3 mb-3" key={key}>
                                                <div className="card shadow-lg">
                                                    <img src={val?.certificateImage?.url} style={{height:"300px"}} className="card-img-top w-100" alt="..." />
                                                    <div className="card-body">
                                                        <p className="card-text">
                                                            <span><span className='fw-bold'>Student Name: </span><span>{val?.studentName}</span></span><br />
                                                            <span><span className='fw-bold'>Course: </span><span>{val?.courseName}</span></span><br />
                                                            <span><span className='fw-bold'>Duration: </span><span>{val?.courseDuration}</span></span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <div className='d-flex flex-nowrap align-items-center justify-content-center gap-3'>
                                        <button className='btn btn-primary text-white' onClick={()=> setCurrentPage(currentPage - 1)} disabled={currentPage === 1}><i className="fa-solid fa-arrow-left"></i></button>
                                        <button 
                                            className='btn btn-primary text-white' 
                                            onClick={() => {
                                                if(endIndex < allCertificate?.length){
                                                    setCurrentPage(currentPage + 1)
                                                }
                                            }} 
                                        disabled={endIndex >= allCertificate?.length}><i className="fa-solid fa-arrow-right"></i></button>
                                    </div>
                                </>
                                
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

export default CertificateIndex