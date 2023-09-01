import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCertificates } from '../../Features/Certifications/CertificationSlice'

function CertificateIndex() {

    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const[allCertificate,setAllCertificate] = useState([])
    const [loading, setLoading] = useState(true)

    const { certificates, responseStatus, responseMessage } = useSelector(
        (state) => state.certificates
    );

    const getAllCourses = () => {
        dispatch(getCertificates());
    }

    useEffect(()=>{
        setAllCertificate(certificates?.data)
    },[certificates])

    useEffect(()=>{
        if (responseStatus == 'success') {
            setLoading(false)
        }
    },[allCertificate])
    
    useEffect(() => {
        getAllCourses();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allCertificate?.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <>
            <div className="container-fuild">
                <h1 className="text-center fst-italic pt-3 mb-4 mt-5 fw-bold fs-48px"><i className="fa-solid fa-award"></i> OUR CERTIFIED STUDENTS</h1>
                    <div className="container p-3">
                        <div className="row mt-5 m-3">
                            {
                                !loading ?
                                currentItems?.map((val,key)=>(
                                    <div className="col-md-3" key={key}>
                                        <div className="card shadow-lg" style={{width: "18rem"}}>
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
                                :
                                <>
                                    <center>
                                        <div className="loader"></div>
                                    </center>
                                </>
                            }
                        </div>
                        <div className="pagination" style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                            {Array(Math?.ceil(allCertificate?.length / itemsPerPage))?.fill()?.map((_, i) => (
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

export default CertificateIndex