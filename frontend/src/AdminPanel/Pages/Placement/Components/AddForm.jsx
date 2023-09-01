/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createPlacement } from '../../../../Features/Placements/PlacementSlice';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';

function PlacementAddForm() {

  const dispatch = useDispatch();

  const { placements, responseStatus, responseMessage } = useSelector(
    (state) => state.placements
  );

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [designation, setDesignation] = useState('');
  const [placedStudentImage, setPlacedStudentImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    const placedStudentData = new FormData();
    placedStudentData.append("name", name);
    placedStudentData.append("company", company);
    placedStudentData.append("designation", designation);
    placedStudentData.append("placedStudentImage", placedStudentImage);

    dispatch(createPlacement(placedStudentData));
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
  },[placements])

  useEffect(()=>{
    if (responseStatus === 'success' && responseMessage === 'Placed Student created successfully') {
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
                            id="name" 
                            name='name' 
                            className="form-control" 
                            placeholder="Name"  
                            onChange={(e)=>setName(e.target.value)}
                            required='required' 
                        />
                        <label htmlFor="name" className='inputLabel'>Name</label>
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-12">
                        <div className="form-floating mb-3">
                        <input 
                            type="text" 
                            id="company" 
                            name='company' 
                            className="form-control" 
                            placeholder="company" 
                            onChange={(e)=>setCompany(e.target.value)}
                            required='required' 
                        />
                        <label htmlFor="company" className='inputLabel'>Company</label>
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-12">
                        <div className="form-floating mb-3">
                        <input 
                            type="text" 
                            id="designation" 
                            name='designation' 
                            className="form-control" 
                            placeholder="Designation" 
                            onChange={(e)=>setDesignation(e.target.value)}
                            required='required' 
                        />
                        <label htmlFor="designation" className='inputLabel'>Designation</label>
                        </div>
                    </div>
                </div>
                <div className='row'>
                  <div className='col-md-12'>
                    <label role='button' htmlFor="placedStudentImage" className='text-nowrap mt-4 inputLabel'>Student Image:</label>
                    <input 
                      type="file" 
                      id="placedStudentImage" 
                      name='placedStudentImage'
                      className='mt-4' 
                      onChange={(e)=>setPlacedStudentImage(e.target.files[0])}
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

export default PlacementAddForm