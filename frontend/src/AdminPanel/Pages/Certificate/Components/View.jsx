/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCertificate } from '../../../../Features/Certifications/CertificationSlice';

function CertificateView({certificateID, setViewDrawer}) {

    const dispatch = useDispatch()

    const param = useParams()
    const placedStudentID = param.id

    const { certificates, responseStatus, responseMessage } = useSelector(
        (state) => state.certificates
    );

    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)

    const getData = () => {
        dispatch(getCertificate(placedStudentID));
    }
    
    useEffect(() => {
        getData()
    }, []);

    useEffect(()=>{
        setData(certificates?.data)
        setLoading(false)
    },[certificates])

    return (
        <>
            <div className='bg-GrayDiv'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div>
                            <table className='table table-bordered fs-4 rounded'>
                                <tr className=''>
                                    <th className='ps-4'>Student Name</th>
                                    <td className='text-right pe-4'>{data?.studentName}</td>
                                </tr>
                                <tr className=''>
                                    <th className='ps-4'>Course Name</th>
                                    <td className='text-right pe-4'>{data?.courseName}</td>
                                </tr>
                                <tr className=''>
                                    <th className='ps-4'>Course Duration</th>
                                    <td className='text-right pe-4'>{data?.courseDuration}</td>
                                </tr>
                                <tr className=''>
                                    <th className='ps-4'>Course Link</th>
                                    <td className='text-right pe-4'>{data?.courseLink}</td>
                                </tr>
                                <tr className=''>
                                    <th className='ps-4'>Image</th>
                                    <td className='text-right pe-4'><img src={data?.certificateImage?.url} className='w-100' style={{ height: '300px' }} alt="" /></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CertificateView