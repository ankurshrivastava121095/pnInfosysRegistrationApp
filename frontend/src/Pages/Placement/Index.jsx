/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPlacements } from '../../Features/Placements/PlacementSlice'

function PlacementIndex() {

    const dispatch = useDispatch()

    const itemPerPage = 4

    const [currentPage, setCurrentPage] = useState(1)
    const[allplacement,setAllPlacement] = useState([])
    const [loading, setLoading] = useState(true)

    const startIndex = (currentPage - 1) * itemPerPage
    const endIndex = startIndex + itemPerPage
    const displayData = allplacement?.slice(startIndex, endIndex)

    const { placements, responseStatus, responseMessage } = useSelector(
        (state) => state.placements
    );

    const getAllPlacements = () => {
        dispatch(getPlacements());
    }

    useEffect(()=>{
        setLoading(false)
        if (placements?.data && placements.data.length > 0) {
            setAllPlacement(placements?.data)
        }
    },[placements])

    useEffect(()=>{
        if (responseStatus === 'success') {
            setLoading(false)
        }
    },[allplacement])
    
    useEffect(() => {
        getAllPlacements();
    }, []);

    return (
        <>
            <div className="container-fuild">
                <h1 className="text-center fst-italic pt-3 mb-4 mt-5 fw-bold fs-48px"><i className="fa-solid fa-graduation-cap"></i> OUR PLACED STUDENTS</h1>
                    <div className="container p-3">
                        <div className="row mt-5 m-3">
                            {
                                !loading ?
                                    <>
                                        {
                                            Array.isArray(displayData) && displayData?.map((val,key)=>(
                                                <div className="col-md-3 mb-4" key={key}>
                                                    <div className="card shadow-lg" style={{width: "18rem"}}>
                                                        <img src={val?.placedStudentImage?.url} style={{height:"300px"}} className="card-img-top w-100" alt="..." />
                                                        <div className="card-body">
                                                            <p className="card-text">
                                                                <span><span className='fw-bold'>Name: </span><span>{val?.name}</span></span><br />
                                                                <span><span className='fw-bold'>Company: </span><span>{val?.company}</span></span><br />
                                                                <span><span className='fw-bold'>Designation: </span><span>{val?.designation}</span></span>
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
                                                    if(endIndex < allplacement?.length){
                                                        setCurrentPage(currentPage + 1)
                                                    }
                                                }} 
                                            disabled={endIndex >= allplacement?.length}><i className="fa-solid fa-arrow-right"></i></button>
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

export default PlacementIndex