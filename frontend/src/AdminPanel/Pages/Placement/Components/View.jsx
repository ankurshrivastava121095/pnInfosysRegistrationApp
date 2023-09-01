import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPlacement } from '../../../../Features/Placements/PlacementSlice';

function PlacementView() {

    const dispatch = useDispatch()

    const param = useParams() 
    const placedStudentID = param.id

    const { placements, responseStatus, responseMessage } = useSelector(
        (state) => state.placements
    );

    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)

    const getData = () => {
        dispatch(getPlacement(placedStudentID));
    }
    
    useEffect(() => {
        getData()
    }, []);

    useEffect(()=>{
        setData(placements?.data)
        setLoading(false)
    },[placements])

    return (
        <>
            <div className='bg-GrayDiv'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div>
                            <table className='table table-bordered fs-4 rounded'>
                                <tr className=''>
                                    <th className='ps-4'>Name</th>
                                    <td className='text-right pe-4'>{data?.name}</td>
                                </tr>
                                <tr className=''>
                                    <th className='ps-4'>Company</th>
                                    <td className='text-right pe-4'>{data?.company}</td>
                                </tr>
                                <tr className=''>
                                    <th className='ps-4'>Designation</th>
                                    <td className='text-right pe-4'>{data?.designation}</td>
                                </tr>
                                <tr className=''>
                                    <th className='ps-4'>Image</th>
                                    <td className='text-right pe-4'><img src={data?.placedStudentImage?.url} className='w-100' style={{ height: '300px' }} alt="" /></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlacementView