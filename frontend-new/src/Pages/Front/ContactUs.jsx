import React from 'react'
import Navbar from '../../Components/Layouts/Navbar'
import Footer from '../../Components/Layouts/Footer'
import { Box, Button, TextField, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';

const ContactUs = () => {
    return (
        <>
            <Navbar />

            <div className="container-fluid mt-5" style={{ backgroundImage: `url('/contactUsImage.jpg')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
                <div className="row py-5">
                    <div className="col-md-12">
                        <div style={{ minHeight: '70vh' }} className='d-flex align-items-center justify-content-center'>
                            <div className='w-100 rounded'>
                                <div className="row">
                                    <div className="col-md-5 d-flex align-items-center justify-content-center" style={{ background: 'rgb(0 113 187 / 57%)' }}>
                                        <Box sx={{ pb: 3 }}>
                                            <Typography variant='h4' sx={{ fontWeight: 'bold', fontStyle: 'italic', mt: 3, color: '#fff' }} color='primary'>Get in touch with <br /> PNINFOSYS!</Typography>
                                            <Typography variant='h5' sx={{ fontWeight: 'bold', fontStyle: 'italic', mt: 3, color: '#fff' }} color='primary'>Our Address</Typography>
                                            <Typography sx={{ mt: 1, color: '#fff' }} color='primary'>MIG-332 Darpan Colony, Thatipur, <br /> Gwalior,Madhya Pradesh</Typography>
                                            <Typography sx={{ mt: 0, color: '#fff' }} color='primary'>www.pninfosys.com</Typography>
                                            <Typography sx={{ mt: 0, color: '#fff' }} color='primary'>support@pninfosys.com</Typography>
                                            <Typography sx={{ mt: 0, color: '#fff' }} color='primary'>+91 7000846823</Typography>
                                            <Typography sx={{ mt: 0, color: '#fff' }} color='primary'>+91 7415289378</Typography>
                                        </Box>
                                    </div>
                                    <div className="col-md-7">
                                        <Box sx={{ boxShadow: 3, p: 4, background: '#fff' }}>
                                            <Typography sx={{ mb: 3 }}>For any general query, Please fill in the following contact form:</Typography>
                                            <TextField 
                                                id="outlined-basic" 
                                                label="Your Name"
                                                sx={{ mb: 3 }} 
                                                variant="outlined"
                                                fullWidth 
                                                required
                                            />
                                            <TextField 
                                                id="outlined-basic" 
                                                label="Your Email"
                                                sx={{ mb: 3 }} 
                                                variant="outlined"
                                                fullWidth 
                                                required
                                            />
                                            <TextField 
                                                id="outlined-basic" 
                                                label="Your Contact Number"
                                                sx={{ mb: 3 }} 
                                                variant="outlined"
                                                fullWidth 
                                                required
                                            />
                                            <TextField
                                                id="outlined-multiline-static"
                                                sx={{ mb: 3 }}
                                                label="Your Message"
                                                multiline
                                                rows={4}
                                                fullWidth
                                                required
                                            />
                                            <Button type='submit' size='large' variant='contained' className='bg-gradient' endIcon={<SendIcon />} fullWidth>Send message</Button>
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

export default ContactUs