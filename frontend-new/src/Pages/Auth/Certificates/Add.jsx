import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import MobileMenus from '../../../Components/Layouts/MobileMenus';
import AdminHeader from '../../../Components/Layouts/AdminHeader';
import Breadcrumbs from '../../../Components/Layouts/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import RichTextEditor from '../../../Components/InputComponents/RichTextEditor';
import FullPageLoading from '../../../Components/Loaders/FullPageLoader';
import AuthProtector from '../../../Components/Authentication/AuthProtector';

const AddCertificate = () => {

    const navigate = useNavigate()

    const breadcrumbData = {
        currentPage: 'Add Certificate',
        previousPages: [
            { page: 'Dashboard', route: '/pn/dashboard' },
            { page: 'Certificates', route: '/pn/certificates' },
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
                                    <Typography color='error'>All Fields are mandatory.</Typography>
                                    <div className="row">
                                        <div className="col-md-7">
                                            <TextField 
                                                id="outlined-basic" 
                                                label="Student Name"
                                                sx={{ mt: 2 }} 
                                                variant="outlined" 
                                                fullWidth
                                                required
                                            />
                                            <TextField 
                                                id="outlined-basic" 
                                                label="Course Name"
                                                sx={{ mt: 2 }} 
                                                variant="outlined" 
                                                fullWidth
                                                required
                                            />
                                            <TextField 
                                                id="outlined-basic" 
                                                label="Course Duration"
                                                sx={{ my: 2 }} 
                                                variant="outlined" 
                                                fullWidth
                                                required
                                            />
                                            <input 
                                                type="file"
                                                className='form-control form-control-lg mb-3' 
                                            />
                                            <Button type='submit' className='bg-gradient' sx={{ fontStyle: 'italic', fontWeight: 'bold' }} variant='contained' startIcon={<SaveIcon />}>Save</Button>
                                        </div>
                                        <div className="col-md-5"></div>
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

export default AddCertificate