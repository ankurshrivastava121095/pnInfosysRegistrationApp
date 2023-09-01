import React from 'react'
import { Link } from 'react-router-dom'
import BarChart from '../../../ExtraComponents/Charts/BarChart'
import LineChart from '../../../ExtraComponents/Charts/LineChart'
import PieChart from '../../../ExtraComponents/Charts/PieChart'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
import { getCounts } from '../../../Features/Dashboard/DashboardSlice'

function Dashboard() {

    const dispatch = useDispatch()
    
    const { counts, responseStatus, responseMessage } = useSelector(
        (state) => state.counts
    );

    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (counts?.data) {
            setData(counts?.data);
            setLoading(false)
        }
    }, [counts]);

    useEffect(()=>{
        dispatch(getCounts())
    },[])

    return (
        <>
            <div className='bg-GrayDiv'>
                <div className='row'>
                    <div className='col-md-3 mb-2 mt-2'>
                        <div className='w-100 bg-darkBlue dashBoxShadow rounded'>
                            <div className='dashBoxParDiv'>
                                <h1><Link to='/admin/student/studentList' className='text-decoration-none text-white'><i className="fa-solid fa-graduation-cap"></i></Link></h1>
                                <div>
                                    <h5><Link to='/admin/student/studentList' className='text-decoration-none text-white'>Total Students</Link></h5>
                                    <p>
                                        <Link to='/admin/student/studentList' className='text-decoration-none text-white'>
                                            {
                                                !loading ?
                                                    data?.studentCount
                                                :
                                                    <div className="smallLoader"></div>
                                            }
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 mb-2 mt-2'>
                        <div className='w-100 bg-darkBlue dashBoxShadow rounded text-white'>
                            <div className='dashBoxParDiv'>
                                <h1><Link to='/admin/courses/coursesList' className='text-decoration-none text-white'><i className="fa-solid fa-code"></i></Link></h1>
                                <div>
                                    <h5><Link to='/admin/courses/coursesList' className='text-decoration-none text-white'>Total Courses</Link></h5>
                                    <p>
                                        <Link to='/admin/courses/coursesList' className='text-decoration-none text-white'>
                                            {
                                                !loading ?
                                                    data?.courseCount
                                                :
                                                    <div className="smallLoader"></div>
                                            }
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 mb-2 mt-2'>
                        <div className='w-100 bg-darkBlue dashBoxShadow rounded text-white'>
                            <div className='dashBoxParDiv'>
                                <h1><Link to='/admin/messages' className='text-decoration-none text-white'><i className="fa-solid fa-message"></i></Link></h1>
                                <div>
                                    <h5><Link to='/admin/messages' className='text-decoration-none text-white'>Total Messages</Link></h5>
                                    <p>
                                        <Link to='/admin/messages' className='text-decoration-none text-white'>
                                            {
                                                !loading ?
                                                    data?.messageCount
                                                :
                                                    <div className="smallLoader"></div>
                                            }
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 mb-2 mt-2'>
                        <div className='w-100 bg-darkBlue dashBoxShadow rounded text-white'>
                            <div className='dashBoxParDiv'>
                                <h1><Link to='/admin/student/studentList' className='text-decoration-none text-white'><i className="fa-solid fa-code"></i></Link></h1>
                                <div>
                                    <h5><Link to='/admin/student/studentList' className='text-decoration-none text-white'>Total Courses</Link></h5>
                                    <p>
                                        <Link to='/admin/student/studentList' className='text-decoration-none text-white'>
                                            {
                                                !loading ?
                                                    data?.courseCount
                                                :
                                                    <div className="smallLoader"></div>
                                            }
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-GrayDiv mt-3'>
                <div className='row'>
                    <div className='col-md-8'>
                        <div>
                            <BarChart />
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <PieChart />
                    </div>
                </div>
            </div>
            <div className='bg-GrayDiv mt-3'>
                <div className='row'>
                    <div className="col-md-12">
                        <LineChart />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard