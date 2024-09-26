import React from 'react'
import Navbar from '../../../Components/Layouts/Navbar'
import Footer from '../../../Components/Layouts/Footer'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const CourseRegistration = () => {
    return (
        <>
            <Navbar />

            <div className="container">
                <div className='py-5'>
                    <div className="row py-5">
                        <div className="col-md-12">
                            <div style={{ minHeight: '70vh' }} className='d-flex align-items-center justify-content-center'>
                                <div className='w-100'>
                                    <center>
                                        <Typography variant='h5' sx={{ fontWeight: 'bold', fontStyle: 'italic', mt: 3 }} color='primary'>Register Yourself Here!</Typography>
                                    </center>
                                    <div className="row mt-4">
                                        <div className="col-md-6" style={{ backgroundImage: `url('https://img.freepik.com/free-vector/3d-block-layers-infographic-template_23-2148561906.jpg?t=st=1727173361~exp=1727176961~hmac=e34cbaa1fee5235e4e51d957d11ea658ac831cada5ceaab7ce5e077ead71bcc4&w=996')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}></div>
                                        <div className="col-md-6">
                                            <Box sx={{ boxShadow: 3, background: '#fff', p: 4 }}>
                                                <Typography color='primary' variant='h5' sx={{ mb: 1, fontWeight: 'bold' }}>Apply for MERN Stack Development Course</Typography>
                                                <Typography color='error' sx={{ mb: 3 }}>All fields are mandatory.</Typography>
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
                                                <FormControl sx={{ mb: 3 }} fullWidth required>
                                                    <InputLabel id="demo-simple-select-label">Your Gender</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        label="Your Gender"
                                                        // value={age}
                                                        // onChange={handleChange}
                                                    >
                                                        <MenuItem value="MALE">MALE</MenuItem>
                                                        <MenuItem value="FEMALE">FEMALE</MenuItem>
                                                        <MenuItem value="OTHER">OTHER</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    sx={{ mb: 3 }}
                                                    label="Your Address"
                                                    multiline
                                                    rows={4}
                                                    fullWidth
                                                    required
                                                />
                                                <FormControl sx={{ mb: 3 }} fullWidth required>
                                                    <InputLabel id="demo-simple-select-label">Your College</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        label="Your College"
                                                        // value={age}
                                                        // onChange={handleChange}
                                                    >
                                                        <MenuItem value="RJIT">RJIT</MenuItem>
                                                        <MenuItem value="SHRIRAM COLLEGE OF ENGINEERING AND MANAGEMENT">SHRIRAM COLLEGE OF ENGINEERING AND MANAGEMENT</MenuItem>
                                                        <MenuItem value="MPCT">MPCT</MenuItem>
                                                        <MenuItem value="MITS">MITS</MenuItem>
                                                        <MenuItem value="ITM">ITM</MenuItem>
                                                        <MenuItem value="OTHER">OTHER</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <FormControl sx={{ mb: 3 }} fullWidth required>
                                                    <InputLabel id="demo-simple-select-label">Your Branch</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        label="Your Branch"
                                                        // value={age}
                                                        // onChange={handleChange}
                                                    >
                                                        <MenuItem value="CSE">CSE</MenuItem>
                                                        <MenuItem value="IT">IT</MenuItem>
                                                        <MenuItem value="EE">EE</MenuItem>
                                                        <MenuItem value="EC">EC</MenuItem>
                                                        <MenuItem value="MECHANICAL">MECHANICAL</MenuItem>
                                                        <MenuItem value="CIVIL">CIVIL</MenuItem>
                                                        <MenuItem value="AUTOMOBILE">AUTOMOBILE</MenuItem>
                                                        <MenuItem value="OTHER">OTHER</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <FormControl sx={{ mb: 3 }} fullWidth required>
                                                    <InputLabel id="demo-simple-select-label">Your Qualification</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        label="Your Qualification"
                                                        // value={age}
                                                        // onChange={handleChange}
                                                    >
                                                        <MenuItem value="B.TECH">B.TECH</MenuItem>
                                                        <MenuItem value="BCA">BCA</MenuItem>
                                                        <MenuItem value="MCA">MCA</MenuItem>
                                                        <MenuItem value="B.SC.">B.SC.</MenuItem>
                                                        <MenuItem value="OTHER">OTHER</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <FormControl sx={{ mb: 3 }} fullWidth required>
                                                    <InputLabel id="demo-simple-select-label">Your Semester</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        label="Your Semester"
                                                        // value={age}
                                                        // onChange={handleChange}
                                                    >
                                                        <MenuItem value="FIRST">FIRST</MenuItem>
                                                        <MenuItem value="SECOND">SECOND</MenuItem>
                                                        <MenuItem value="THIRD">THIRD</MenuItem>
                                                        <MenuItem value="FOURTH">FOURTH</MenuItem>
                                                        <MenuItem value="FIFTH">FIFTH</MenuItem>
                                                        <MenuItem value="SIXTH">SIXTH</MenuItem>
                                                        <MenuItem value="SEVENTH">SEVENTH</MenuItem>
                                                        <MenuItem value="EIGHTH">EIGHTH</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <Button type='submit' size='large' variant='contained' className='bg-gradient' startIcon={<GroupAddIcon />} fullWidth>Click to Register</Button>
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

export default CourseRegistration