/* eslint-disable no-unused-vars */
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { getSlider, updateSlider } from '../../../../Features/Sliders/SliderSlice';

function SliderEditForm() {

  const dispatch = useDispatch()
  const param = useParams()

  const sliderID = param.id

  const { sliders, responseStatus, responseMessage } = useSelector(
    (state) => state.sliders
  );

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [sliderImage, setSliderImage] = useState('');
  const [sliderStatus, setSliderStatus] = useState('');
  const [showCurrentImage, setShowCurrentImage] = useState('');

  const getSliderDetail = async() => {
    dispatch(getSlider(sliderID))
  }
      
  useEffect(()=>{
      getSliderDetail()
  },[])

  useEffect(()=>{
    setLoading(false)
    setTitle(sliders?.data?.title)
    setSliderStatus(sliders?.data?.sliderStatus)
    setShowCurrentImage(sliders?.data?.sliderImage?.url)
  },[sliders])

  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)

    const slider_Data = {
      _id: sliderID,
      title: title,
      sliderStatus: sliderStatus,
      sliderImage: sliderImage,
    };

    dispatch(updateSlider(slider_Data));
  }

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
  },[sliders])

  useEffect(()=>{
    if (responseStatus === 'success' && responseMessage === 'Slider updated successfully') {
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
                        id="title" 
                        name='title' 
                        className="form-control" 
                        placeholder="Title" 
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        required='required' 
                      />
                      <label htmlFor="title" className='inputLabel'>Title</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='mb-3'>
                <div className='row'>
                  <div className='col-md-12 d-flex gap-15'>
                    <label role='button' htmlFor="sliderImage" className='text-nowrap mt-4 inputLabel'>Slider Image:</label>
                    <input 
                      type="file" 
                      id="sliderImage" 
                      name='sliderImage'
                      className='mt-4' 
                      onChange={(e)=>setSliderImage(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="row">
                  <div className="col-md-12">
                    <img src={showCurrentImage} style={{height:"200px"}} alt="" />
                  </div>
                </div>
              </div>
              <div className='mb-3'>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="sliderStatus">Status</label>
                    <select name="sliderStatus" id="sliderStatus" className='form-select' value={sliderStatus} onChange={(e)=>setSliderStatus(e.target.value)}>
                      <option value="Active">Active</option>
                      <option value="Deactive">Deactive</option>
                    </select>
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
                  <button type='submit' className="btn btn-darkBlue w-100">Update</button>
                )
              }
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SliderEditForm