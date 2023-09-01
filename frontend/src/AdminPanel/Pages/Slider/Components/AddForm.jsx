/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { createSlider } from '../../../../Features/Sliders/SliderSlice';
import { useEffect } from 'react';

function SliderAddForm() {

  const dispatch = useDispatch();

  const { sliders, responseStatus, responseMessage } = useSelector(
    (state) => state.sliders
  );

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [sliderImage, setSliderImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    const sliderData = new FormData();
    sliderData.append("title", title);
    sliderData.append("sliderImage", sliderImage);

    dispatch(createSlider(sliderData));
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
  },[sliders])

  useEffect(()=>{
    if (responseStatus === 'success' && responseMessage === 'Slider created successfully') {
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
                        placeholder="Course Name" 
                        onChange={(e)=>setTitle(e.target.value)}
                        required='required' 
                      />
                      <label htmlFor="title" className='inputLabel'>Title</label>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-12'>
                    <label role='button' htmlFor="sliderImage" className='text-nowrap mt-4 inputLabel'>Slider Image:</label>
                    <input 
                      type="file" 
                      id="sliderImage" 
                      name='sliderImage'
                      className='mt-4' 
                      onChange={(e)=>setSliderImage(e.target.files[0])}
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

export default SliderAddForm