/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createBanner } from '../../../../Features/Banners/BannerSlice';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';

function BannerAddForm() {

  const dispatch = useDispatch();

  const { banners, responseStatus, responseMessage } = useSelector(
    (state) => state.banners
  );

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [bannerImage, setBannerImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    const bannerData = new FormData();
    bannerData.append("title", title);
    bannerData.append("bannerImage", bannerImage);

    dispatch(createBanner(bannerData));
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
  },[banners])

  useEffect(()=>{
    if (responseStatus === 'success' && responseMessage === 'Banner created successfully') {
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
                        placeholder="Banner Title"  
                        onChange={(e)=>setTitle(e.target.value)}
                        required='required' 
                      />
                      <label htmlFor="title" className='inputLabel'>Banner Title</label>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-12'>
                    <label role='button' htmlFor="bannerImage" className='text-nowrap mt-4 inputLabel'>Banner Image:</label>
                    <input 
                      type="file" 
                      id="bannerImage" 
                      name='bannerImage'
                      className='mt-4' 
                      // onChange={onHandleImageChange}
                      onChange={(e)=>setBannerImage(e.target.files[0])}
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

export default BannerAddForm