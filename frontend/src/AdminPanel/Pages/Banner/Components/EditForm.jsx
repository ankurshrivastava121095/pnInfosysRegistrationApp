/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBanner, updateBanner } from '../../../../Features/Banners/BannerSlice';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-bootstrap';

function BannerEditForm() {

  const dispatch = useDispatch()
  const param = useParams()

  const bannerID = param.id

  const { banners, responseStatus, responseMessage } = useSelector(
    (state) => state.banners
  );

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [bannerStatus, setBannerStatus] = useState('');
  const [showCurrentImage, setShowCurrentImage] = useState('');

  const getSliderDetail = async() => {
    dispatch(getBanner(bannerID))
  }
      
  useEffect(()=>{
      getSliderDetail()
  },[])

  useEffect(()=>{
    setLoading(false)
    setTitle(banners?.data?.title)
    setBannerImage(banners?.data?.bannerStatus)
    setShowCurrentImage(banners?.data?.bannerImage?.url)
  },[banners])

  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)

    const banner_Data = {
      _id: bannerID,
      title: title,
      bannerStatus: bannerStatus,
      bannerImage: bannerImage,
    };

    dispatch(updateBanner(banner_Data));
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
  },[banners])

  useEffect(()=>{
    if (responseStatus === 'success' && responseMessage === 'Banner updated successfully') {
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
                    <label role='button' htmlFor="bannerImage" className='text-nowrap mt-4 inputLabel'>Banner Image:</label>
                    <input 
                      type="file" 
                      id="bannerImage" 
                      name='bannerImage'
                      className='mt-4' 
                      onChange={(e)=>setBannerImage(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="row">
                  <div className="col-md-12">
                    <img src={showCurrentImage} style={{width:"500px",height:"100%"}} alt="" />
                  </div>
                </div>
              </div>
              <div className='mb-3'>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="bannerStatus">Status</label>
                    <select name="bannerStatus" id="bannerStatus" className='form-select' value={bannerStatus} onChange={(e)=>setBannerStatus(e.target.value)}>
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

export default BannerEditForm