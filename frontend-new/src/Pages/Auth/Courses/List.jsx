import { Avatar, Box, Button, ButtonGroup, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import MobileMenus from '../../../Components/Layouts/MobileMenus';
import AdminHeader from '../../../Components/Layouts/AdminHeader';
import Breadcrumbs from '../../../Components/Layouts/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FullPageLoading from '../../../Components/Loaders/FullPageLoader';
import AuthProtector from '../../../Components/Authentication/AuthProtector';

const CourseList = () => {

    const navigate = useNavigate()

    const breadcrumbData = {
        currentPage: 'Courses',
        previousPages: [
            { page: 'Dashboard', route: '/pn/dashboard' }
        ]
    }

    const [isLoading, setIsLoading] = useState(false)

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
                                        <Button type='button' className='bg-gradient' sx={{ fontStyle: 'italic', fontWeight: 'bold' }} variant='contained' startIcon={<AddIcon />} onClick={()=> setTimeout(() => { navigate(`/pn/add-course`) }, 300)}>Add new</Button>
                                    </div>
                                    <div className='mt-2' style={{ overflowY: 'auto' }}>
                                        <table className='table table-bordered table-hover'>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>ACTION</th>
                                                    <th>BANNER</th>
                                                    <th>COURSE</th>
                                                    <th>DURATION</th>
                                                    <th>FEES</th>
                                                    <th>NEW BATCH</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1.</td>
                                                    <td>
                                                        <Tooltip title="Edit" onClick={()=> setTimeout(() => { navigate(`/pn/course-edit/${1}`) }, 300)}>
                                                            <IconButton>
                                                                <EditIcon color='primary' />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </td>
                                                    <td><Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /></td>
                                                    <td>Course</td>
                                                    <td>Duration</td>
                                                    <td>Fees</td>
                                                    <td><Typography sx={{ fontWeight: 'bold' }} color='error'><span className='fa-fade'>Starting on September 29,2024</span></Typography></td>
                                                </tr>
                                                <tr>
                                                    <td>2.</td>
                                                    <td>
                                                        <Tooltip title="Edit" onClick={()=> setTimeout(() => { navigate(`/pn/course-edit/${1}`) }, 300)}>
                                                            <IconButton>
                                                                <EditIcon color='primary' />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </td>
                                                    <td><Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /></td>
                                                    <td>Course</td>
                                                    <td>Duration</td>
                                                    <td>Fees</td>
                                                    <td><Typography>Started on September 19,2024</Typography></td>
                                                </tr>
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

export default CourseList