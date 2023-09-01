import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCourse } from '../../../../Features/Courses/CourseSlice';

function CourseView() {

    const dispatch = useDispatch()

    const param = useParams()
    const courseID = param.id

    const { courses, responseStatus, responseMessage } = useSelector(
        (state) => state.courses
    );

    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)

    const getData = () => {
        dispatch(getCourse(courseID));
    }
    
    useEffect(() => {
        getData()
    }, []);

    useEffect(()=>{
        setData(courses?.data)
        setLoading(false)
    },[courses])

    return (
        <>
            <div className='bg-GrayDiv'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div>
                            <table className='table table-bordered fs-4 bg-lightBlue rounded'>
                                <tr className=''>
                                    <th className='text-darkBlue ps-4'>Course Name</th>
                                    <td className='text-darkBlue text-right pe-4'>{data?.courseName}</td>
                                </tr>
                                <tr className=''>
                                    <th className='text-darkBlue ps-4'>Database Name</th>
                                    <td className='text-darkBlue text-right pe-4'>{data?.databaseName}</td>
                                </tr>
                                <tr className=''>
                                    <th className='text-darkBlue ps-4'>Database Icon</th>
                                    <td className='text-darkBlue text-right pe-4'><i className={data?.databaseIcon}></i></td>
                                </tr>
                                <tr className=''>
                                    <th className='text-darkBlue ps-4'>Language One</th>
                                    <td className='text-darkBlue text-right pe-4'>{data?.languageOne}</td>
                                </tr>
                                <tr className=''>
                                    <th className='text-darkBlue ps-4'>Language One Icon</th>
                                    <td className='text-darkBlue text-right pe-4'><i className={data?.languageOneIcon}></i></td>
                                </tr>
                                <tr className=''>
                                    <th className='text-darkBlue ps-4'>Language Two</th>
                                    <td className='text-darkBlue text-right pe-4'>{data?.languageTwo}</td>
                                </tr>
                                <tr className=''>
                                    <th className='text-darkBlue ps-4'>Language Two Icon</th>
                                    <td className='text-darkBlue text-right pe-4'><i className={data?.languageTwoIcon}></i></td>
                                </tr>
                                <tr className=''>
                                    <th className='text-darkBlue ps-4'>Language Three</th>
                                    <td className='text-darkBlue text-right pe-4'>{data?.languageThree}</td>
                                </tr>
                                <tr className=''>
                                    <th className='text-darkBlue ps-4'>Language Three Icon</th>
                                    <td className='text-darkBlue text-right pe-4'><i className={data?.languageThreeIcon}></i></td>
                                </tr>
                                <tr className=''>
                                    <th className='text-darkBlue ps-4'>Language Four</th>
                                    <td className='text-darkBlue text-right pe-4'>{data?.languageFour}</td>
                                </tr>
                                <tr className=''>
                                    <th className='text-darkBlue ps-4'>Language Four Icon</th>
                                    <td className='text-darkBlue text-right pe-4'><i className={data?.languageFourIcon}></i></td>
                                </tr>
                                <tr className=''>
                                    <th className='text-darkBlue ps-4'>Duration</th>
                                    <td className='text-darkBlue text-right pe-4'>{data?.duration}</td>
                                </tr>
                                <tr className=''>
                                    <th className='text-darkBlue ps-4'>Fees</th>
                                    <td className='text-darkBlue text-right pe-4'>{data?.fees}/-</td>
                                </tr>
                                <tr className=''>
                                    <th className='text-darkBlue ps-4'>Description</th>
                                    <td className='text-darkBlue text-right pe-4'>{data?.description}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseView