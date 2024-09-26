import React from 'react'
import Navbar from '../../../Components/Layouts/Navbar'
import Footer from '../../../Components/Layouts/Footer'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Courses = () => {

    const navigate = useNavigate()

    return (
        <>
            <Navbar />

            <div className="container-fluid" style={{ background: 'rgb(67 161 255)', background: 'linear-gradient(90deg, rgb(67 161 255 / 25%) 35%, rgb(0 90 181 / 0%) 100%)' }}>
                <div className='py-5'>
                    <div className="row py-5">
                        <div className="col-md-12">
                            <div style={{ minHeight: '70vh' }} className='d-flex align-items-center justify-content-center'>
                                <div className='w-100'>
                                    <div className="row mt-4">
                                        <div className="col-md-5 d-flex align-items-start justify-content-center" style={{ background: 'rgb(25 118 210 / 87%)' }}>
                                            <Typography variant='h5' sx={{ fontWeight: 'bold', fontStyle: 'italic', mt: 5, mb: 4 }} color='white'><i className="fa-solid fa-code"></i> Courses we offer</Typography>
                                        </div>
                                        <div className="col-md-7">
                                            <Box sx={{ boxShadow: 3, background: '#fff', px: 2, pb: 2 }}>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <Button sx={{ boxShadow: 3, mt: 2, flexDirection: 'column' }} fullWidth onClick={()=>{ setTimeout(() => { navigate(`/course-registration/1`) }, 300) }}>
                                                            <div style={{ width: '100%', height: '180px', backgroundImage: `url('/contentBgTwo.jpg')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}></div>
                                                            <Box sx={{ width: '100%' }}>
                                                                <Typography sx={{ fontWeight: 'bold', fontSize: '15px', mt: 1 }}>MERN Stack Development</Typography>
                                                                <Typography sx={{ fontWeight: 'bold', fontSize: '14px', mt: 1, color: '#000' }}>Fees: ₹4000</Typography>
                                                                <Typography sx={{ fontWeight: 'bold', fontSize: '14px', mt: 1 }} color='error'><i class="text-uppercase fa-fade text-danger">Upcoming Batch</i></Typography>
                                                                <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }} color='error'><i class="text-uppercase fa-fade text-danger">May 21,2024</i></Typography>
                                                                <Typography sx={{ fontWeight: 'bold', fontSize: '14px', mt: 1 }}>Click to Apply for Registration</Typography>
                                                            </Box>
                                                        </Button>
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
            </div>

            <Footer />
        </>
    )
}

export default Courses