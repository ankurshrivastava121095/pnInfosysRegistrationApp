import React from 'react'
import Navbar from '../../../Components/Layouts/Navbar'
import Footer from '../../../Components/Layouts/Footer'
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const InterviewQuestion = () => {
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
                                        <div className="col-md-5 d-flex align-items-start justify-content-center px-5" style={{ background: 'rgb(25 118 210 / 87%)' }}>
                                            <Box>
                                                <Typography variant='h5' sx={{ fontWeight: 'bold', fontStyle: 'italic', mt: 5 }} color='white'><i className="fa-solid fa-code"></i> Interview Questions</Typography>
                                                <Typography variant='h5' sx={{ fontWeight: 'bold', fontStyle: 'italic', mt: 1, mb: 4 }} color='white'>MERN Stack Development</Typography>
                                            </Box>
                                        </div>
                                        <div className="col-md-7">
                                            <Box sx={{ boxShadow: 3, background: '#fff', p: 4 }}>
                                                <Accordion>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1-content"
                                                        id="panel1-header"
                                                    >
                                                        What is ReactJS ?
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                                                    </AccordionDetails>
                                                </Accordion>
                                                <Accordion>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1-content"
                                                        id="panel2-header"
                                                    >
                                                        What is Virtual DOM ?
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                                                    </AccordionDetails>
                                                </Accordion>
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

export default InterviewQuestion