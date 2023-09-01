import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPlacements } from '../../Features/Placements/PlacementSlice'

function PlacementIndex() {

    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const[allplacement,setAllPlacement] = useState([])
    const [loading, setLoading] = useState(true)

    const { placements, responseStatus, responseMessage } = useSelector(
        (state) => state.placements
    );

    const getAllPlacements = () => {
        dispatch(getPlacements());
    }

    useEffect(()=>{
        setAllPlacement(placements?.data)
    },[placements])

    useEffect(()=>{
        if (responseStatus == 'success') {
            setLoading(false)
        }
    },[allplacement])
    
    useEffect(() => {
        getAllPlacements();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allplacement?.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <>
            <div className="container-fuild">
                <h1 className="text-center fst-italic pt-3 mb-4 mt-5 fw-bold fs-48px"><i className="fa-solid fa-graduation-cap"></i> OUR PLACED STUDENTS</h1>
                    <div className="container p-3">
                        <div className="row mt-5 m-3">
                            {
                                !loading ?
                                currentItems?.map((val,key)=>(
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
                                :
                                <>
                                    <center>
                                        <div className="loader"></div>
                                    </center>
                                </>
                            }
                        </div>
                        <div className="pagination" style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                            {Array(Math?.ceil(allplacement?.length / itemsPerPage))?.fill()?.map((_, i) => (
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

export default PlacementIndex