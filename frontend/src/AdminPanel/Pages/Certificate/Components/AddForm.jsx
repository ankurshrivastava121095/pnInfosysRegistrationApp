/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCertificate } from '../../../../Features/Certifications/CertificationSlice';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';

function CertificateAddForm({setAddDrawer, setRefreshTable, setHandleMsg, setMsgText}) {

  const dispatch = useDispatch();

  const { certificates, responseStatus, responseMessage } = useSelector(
    (state) => state.certificates
  );

  const [loading, setLoading] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [certificateLink, setCertificateLink] = useState('');
  const [certificateImage, setCertificateImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    const certificateData = new FormData();
    certificateData.append("studentName", studentName);
    certificateData.append("courseName", courseName);
    certificateData.append("courseDuration", courseDuration);
    certificateData.append("certificateLink", certificateLink);
    certificateData.append("certificateImage", certificateImage);

    dispatch(createCertificate(certificateData));
  };

  const showSuccessToast = (succMessage) => {
    toast.success(succMessage);
  }

  const showFailToast = (errMessage) => {
      toast.error(errMessage);
  }

  useEffect(()=>{
    if (responseStatus == 'success') {
        setLoading(false)
    }
  },[certificates])

  useEffect(()=>{
    if (responseStatus === 'success' && responseMessage === 'Certificate created successfully') {
        setLoading(false)
        showSuccessToast(responseMessage)
    }
    if (responseStatus === 'rejected') {
        setLoading(false)
        showFailToast(responseMessage)
    }
  },[responseMessage])

  return (
    <>
      <div className='bg-GrayDiv'>
        <ToastContainer />
        <div className='row'>
          <div className='col-md-12 border-darkBlue p-4'>
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <div className="row mb-3">
                    <div className="col-md-12">
                        <div className="form-floating mb-3">
                        <input 
                            type="text" 
                            id="studentName" 
                            name='studentName' 
                            className="form-control" 
                            placeholder="Student Name"  
                            onChange={(e)=>setStudentName(e.target.value)}
                            required='required' 
                        />
                        <label htmlFor="studentName" className='inputLabel'>Student Name</label>
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-12">
                        <div className="form-floating mb-3">
                        <input 
                            type="text" 
                            id="courseName" 
                            name='courseName' 
                            className="form-control" 
                            placeholder="Course Name"  
                            onChange={(e)=>setCourseName(e.target.value)}
                            required='required' 
                        />
                        <label htmlFor="courseName" className='inputLabel'>Course Name</label>
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-12">
                        <div className="form-floating mb-3">
                        <input 
                            type="text" 
                            id="courseDuration" 
                            name='courseDuration' 
                            className="form-control" 
                            placeholder="Course Duration" 
                            onChange={(e)=>setCourseDuration(e.target.value)}
                            required='required' 
                        />
                        <label htmlFor="courseDuration" className='inputLabel'>Course Duration</label>
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-12">
                        <div className="form-floating mb-3">
                        <input 
                            type="text" 
                            id="certificateLink" 
                            name='certificateLink' 
                            className="form-control" 
                            placeholder="Course Link" 
                            onChange={(e)=>setCertificateLink(e.target.value)}
                            required='required' 
                        />
                        <label htmlFor="certificateLink" className='inputLabel'>Course Link</label>
                        </div>
                    </div>
                </div>
                <div className='row'>
                  <div className='col-md-12'>
                    <label role='button' htmlFor="certificateImage" className='text-nowrap mt-4 inputLabel'>Certificate Image:</label>
                    <input 
                      type="file" 
                      id="certificateImage" 
                      name='certificateImage'
                      className='mt-4' 
                      onChange={(e)=>setCertificateImage(e.target.files[0])}
                      required
                    />
                  </div>
                </div>
              </div>
              <br /><br />
              {
                loading ? (
                  <center>
                    <div className="smallLoader"></div>
                  </center>
                ):
                (
                  <button type='submit' className="btn btn-darkBlue w-100">Save</button>
                )
              }
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CertificateAddForm