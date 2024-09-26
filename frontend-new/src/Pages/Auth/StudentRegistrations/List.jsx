/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Box, Button, ButtonGroup, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MobileMenus from '../../../Components/Layouts/MobileMenus';
import AdminHeader from '../../../Components/Layouts/AdminHeader';
import Breadcrumbs from '../../../Components/Layouts/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FullPageLoading from '../../../Components/Loaders/FullPageLoader';
import AuthProtector from '../../../Components/Authentication/AuthProtector';
import { useDispatch, useSelector } from 'react-redux';
import { getStudents, resetStudentState } from '../../../Features/StudentRegistration/StudentRegistrationSlice';

const StudentRegistrationList = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const breadcrumbData = {
        currentPage: 'Student Registrations',
        previousPages: [
            { page: 'Dashboard', route: '/pn/dashboard' }
        ]
    }

    const [isLoading, setIsLoading] = useState(false)
    const [list, setList] = useState([])
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)

    const { students, responseStatus, responseMessage } = useSelector(state => state.students)

    const fetchData = () => {
        setIsLoading(true)
        dispatch(getStudents())
    } 

    useEffect(()=>{
        fetchData()
    },[])

    useEffect(()=>{
        if(responseStatus == 'success' && responseMessage == 'Get All'){
            setList(students?.data)
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

                                <Box sx={{ boxShadow: 3, mt: 2, p: 2 }}>
                                    <div className='d-flex flex-wrap align-items-center justify-content-between gap-2'>
                                        <TextField 
                                            type="search"
                                            id="search" 
                                            label="Search"
                                            variant="outlined"
                                            size='small'
                                            name='search'
                                            // value={loginData?.search}
                                            // onChange={handleLoginInput}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton>
                                                            <SearchIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </div>
                                    <div className='mt-2' style={{ overflowY: 'auto' }}>
                                        <table className='table table-bordered table-hover'>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>ACTION</th>
                                                    <th>APPLIED FOR</th>
                                                    <th>NAME</th>
                                                    <th>PHONE</th>
                                                    <th>EMAIL</th>
                                                    <th>GENDER</th>
                                                    <th>APPLIED ON</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    Array?.isArray(list) && list?.length > 0 ?
                                                        Array?.isArray(list) && list?.map((val,key)=>(
                                                            <tr key={key}>
                                                                <td>{key+1}.</td>
                                                                <td>
                                                                    <Tooltip title="Edit" onClick={()=> setTimeout(() => { navigate(`/pn/course-edit/${1}`) }, 300)}>
                                                                        <IconButton>
                                                                            <EditIcon color='primary' />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </td>
                                                                <td>{val?.courseName}</td>
                                                                <td>{val?.studentName}</td>
                                                                <td>{val?.contactNumber}</td>
                                                                <td>{val?.email}</td>
                                                                <td>{val?.gender}</td>
                                                                <td><Typography sx={{ fontWeight: 'bold' }} color='error'><span className='fa-fade'>Starting on September 29,2024</span></Typography></td>
                                                            </tr>
                                                        ))
                                                    :
                                                    <>
                                                        <tr>
                                                            <td colSpan={8} style={{ textAlign: 'center' }}>No Record Found</td>
                                                        </tr>
                                                    </>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <div>&nbsp;</div>
                                        <div className='d-flex align-items-center gap-2'>
                                            <Typography>Page</Typography>
                                            <ButtonGroup variant="outlined" aria-label="Basic button group">
                                                <Button><ChevronLeftIcon /></Button>
                                                <Button>1</Button>
                                                <Button><ChevronRightIcon /></Button>
                                            </ButtonGroup>
                                        </div>
                                    </div>
                                </Box>

                            </div>
                            <div className="col-md-1"></div>
                        </div>
                    </div>
                </Box>
            </div>

            <MobileMenus />
        </>
    )
}

export default StudentRegistrationList