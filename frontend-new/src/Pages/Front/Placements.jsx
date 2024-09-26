import React from 'react'
import Navbar from '../../Components/Layouts/Navbar'
import Footer from '../../Components/Layouts/Footer'
import { Box, Typography } from '@mui/material'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Placements = () => {
    return (
        <>
            <Navbar />

            <div className="container-fluid mt-5" style={{ backgroundImage: `url('/certifiedStudentImage2.jpg')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
                <div className="row py-5">
                    <div className="col-md-12">
                        <div style={{ minHeight: '70vh' }} className='d-flex align-items-center justify-content-center'>
                            <div className='w-100 rounded'>
                                <div className="row">
                                    <div className="col-md-3 d-flex align-items-start justify-content-center" style={{ background: 'rgb(0 113 187 / 57%)' }}>
                                        <Box sx={{ pb: 3, px: 4 }}>
                                            <Typography variant='h5' sx={{ fontWeight: 'bold', fontStyle: 'italic', pt: 3, color: '#fff' }} color='primary'><i className="fa-solid fa-award"></i> Our Certified Students</Typography>
                                        </Box>
                                    </div>
                                    <div className="col-md-9">
                                        <Box sx={{ boxShadow: 3, background: '#ffffffe3', p: 2}}>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <Box sx={{ background: '#fff', boxShadow: 3, p: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                                                        <Typography>&nbsp;</Typography>
                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <Typography>Page 1 of 5</Typography>
                                                            <KeyboardArrowLeftIcon />
                                                            <KeyboardArrowRightIcon />
                                                        </Box>
                                                    </Box>
                                                </div>
                                                <div className="col-md-3 mt-3">
                                                    <Box sx={{ boxShadow: 5, p: 1, background: '#fff' }}>
                                                        <div style={{ backgroundImage: `url('https://img.freepik.com/free-vector/3d-block-layers-infographic-template_23-2148561906.jpg?t=st=1727173361~exp=1727176961~hmac=e34cbaa1fee5235e4e51d957d11ea658ac831cada5ceaab7ce5e077ead71bcc4&w=996')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', height: '200px', width: '100%' }}></div>
                                                        <Box sx={{ p: 1 }}>
                                                            <Typography sx={{ fontWeight: 'bold' }} color='primary'>John Doe</Typography>
                                                            <Typography sx={{ fontSize: '14px' }}>Company: Infosys</Typography>
                                                            <Typography sx={{ fontSize: '14px' }}>Designation: Software Developer</Typography>
                                                        </Box>
                                                    </Box>
                                                </div>
                                            </div>
                                        </Box>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Placements