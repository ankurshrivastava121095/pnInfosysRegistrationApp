/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MobileMenus from '../../../Components/Layouts/MobileMenus';
import AdminHeader from '../../../Components/Layouts/AdminHeader';
import Breadcrumbs from '../../../Components/Layouts/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import FullPageLoading from '../../../Components/Loaders/FullPageLoader';
import AuthProtector from '../../../Components/Authentication/AuthProtector';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardData, resetStudentState } from '../../../Features/StudentRegistration/StudentRegistrationSlice';
import ErrorModal from '../../../Components/Modals/ErrorModal';
import SuccessModal from '../../../Components/Modals/SuccessModal';

const DashboardIndex = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const breadcrumbData = {
        currentPage: 'Dashboard',
    }

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState('')
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)

    const { students, responseStatus, responseMessage } = useSelector(state => state.students)

    const fetchData = () => {
        setIsLoading(true)
        dispatch(getDashboardData())
    } 

    useEffect(()=>{
        fetchData()
    },[])

    useEffect(()=>{
        if(responseStatus == 'success' && responseMessage == 'Get All'){
            setData(students?.data)
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }
        if(responseStatus == 'rejected' && responseMessage != '' && responseMessage != null){
            setIsLoading(false)
            setTimeout(() => {
                dispatch(resetStudentState())
            }, 1000);
        }
    },[students, responseStatus, responseMessage])

    return (
        <>
            <AuthProtector />
            <FullPageLoading isLoading={isLoading} setIsLoading={setIsLoading} />
            <AdminHeader />

            <div className="w-100 bg-white admin-panel-body-margin-top">
                <Box sx={{ py: 1 }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-1"></div>
                            <div className="col-md-10">
                                
                                <Breadcrumbs data={breadcrumbData} />

                                <div className="row mt-3">
                                    <div className="col-md-6 mb-3">
                                        <Button type='button' variant='outlined' sx={{ textAlign: 'left' }} onClick={()=> setTimeout(() => { navigate(`/pn/student-registration`) }, 300)} fullWidth>
                                            <Box sx={{ width: '100%' }}>
                                                <Typography variant='h4'>{data?.totalRegistration?.length || 0}</Typography>
                                                <Typography>Total Registrations</Typography>
                                            </Box>
                                        </Button>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <Button type='button' variant='outlined' sx={{ textAlign: 'left' }} onClick={()=> setTimeout(() => { navigate(`/pn/certificates`) }, 300)} fullWidth>
                                            <Box sx={{ width: '100%' }}>
                                                <Typography variant='h4'>{data?.totalCertificates?.length || 0}</Typography>
                                                <Typography>Total Certified Students</Typography>
                                            </Box>
                                        </Button>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <Button type='button' variant='outlined' sx={{ textAlign: 'left' }} onClick={()=> setTimeout(() => { navigate(`/pn/courses`) }, 300)} fullWidth>
                                            <Box sx={{ width: '100%' }}>
                                                <Typography variant='h4'>{data?.totalCourses?.length || 0}</Typography>
                                                <Typography>Total Courses</Typography>
                                            </Box>
                                        </Button>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <Button type='button' variant='outlined' sx={{ textAlign: 'left' }} onClick={()=> setTimeout(() => { navigate(`/pn/placements`) }, 300)} fullWidth>
                                            <Box sx={{ width: '100%' }}>
                                                <Typography variant='h4'>{data?.totalPlacements?.length || 0}</Typography>
                                                <Typography>Total Placements</Typography>
                                            </Box>
                                        </Button>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-1"></div>
                        </div>
                    </div>
                </Box>
            </div>

            <MobileMenus />

            <SuccessModal open={showSuccess} setOpen={setShowSuccess} message={responseMessage} />
            <ErrorModal open={showError} setOpen={setShowError} message={responseMessage} />
        </>
    )
}

export default DashboardIndex