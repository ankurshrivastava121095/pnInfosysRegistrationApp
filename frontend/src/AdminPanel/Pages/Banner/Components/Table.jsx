/* eslint-disable react-hooks/exhaustive-deps */
import { Drawer } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import { Link, useNavigate } from 'react-router-dom'
import CourseEditForm from './EditForm';
import CourseView from './View';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useMemo } from 'react';
import BannerAddForm from './AddForm';
import BannerEditForm from './EditForm';
import BannerView from './View';
import { deleteBanner, getBanners } from '../../../../Features/Banners/BannerSlice';
import { useDispatch, useSelector } from 'react-redux';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function BannerList() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { banners, responseStatus, responseMessage } = useSelector(
        (state) => state.banners
    );

    const [allBanners, setAllBanners] = useState([]);
    const [loading, setLoading] = useState(true)

    const handleDelete = (id) => {
        dispatch(deleteBanner(id))
    }

    const showSuccessToast = (succMessage) => {
        toast.success(succMessage);
    }

    const showFailToast = (errMessage) => {
        toast.error(errMessage);
    }

    const columns = useMemo(() => [
        {
            id: 'Action',
            header: "Action",
            disableFilters: true,
            enableGlobalFilter: false,
            enableColumnFilter: false,
            enableColumnOrdering: false,
            accessorFn: (val) => {
                return (
                    <div className='d-flex gap-10'>
                        {/* <button type="button" className='btn btn-sm btn-theme' onClick={() => navigate(`/admin/placement/placementView/${val?._id}`)}><i className="fa-solid fa-eye"></i></button> */}
                        <button type="button" className='btn btn-sm btn-theme' onClick={() => navigate(`/admin/banner/bannerEdit/${val?._id}`)}><i className="fa-solid fa-pen-to-square"></i></button>
                        <button type="button" className='btn btn-sm btn-theme' onClick={() => handleDelete(val._id)}><i className="fa-solid fa-trash-can"></i></button>    
                    </div>
                )
            }
        },
        {
            header: "Title",
            accessorKey: "title",
            enableGlobalFilter: true,
        },
        {
            header: "Status",
            accessorKey: "bannerStatus",
            enableGlobalFilter: true,
        },
    ]);

    const fetchBanners = () => {
        dispatch(getBanners());
    }

    useEffect(()=>{
        fetchBanners()
    },[])

    useEffect(() => {
        if (banners?.data && banners.data.length > 0) {
            setAllBanners(banners.data);
        }
    }, [banners]);

    useEffect(()=>{
        if (responseStatus == 'success') {
            setLoading(false)
        }
    },[banners])

    useEffect(()=>{
        if (responseStatus === 'success' && responseMessage === 'Banner deleted successfully') {
            setLoading(false)
            showSuccessToast(responseMessage)
            fetchBanners()
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
                <div className='d-flex flex-wrap justify-content-between'>
                    <div>&nbsp;</div>
                    <button type="button" className='btn btn-darkBlue mb-3' onClick={() => navigate('/admin/banner/addBanner')}><i className="fa-solid fa-plus"></i> Add New</button>
                </div>
                {
                    !loading ?
                        <div style={{ overflow:'auto',maxWidth:'100%',borderWidth:'2px',borderColor:'#eee',borderStyle:'solid'}}>
                            <MaterialReactTable
                                data={allBanners}
                                enableTopToolbar
                                columns={columns}
                                enableSorting={true}
                                enablePagination={true}
                                enableColumnFilters={true}
                                enableColumnActions={false}
                                enableBottomToolbar={true}
                                enableDensityToggle={false}
                                positionGlobalFilter="right"
                                enableColumnsToggle={false}
                                enableFullScreenToggle={false}
                                enableStickyHeader
                                muiTableContainerProps={{ sx: { minHeight: '450px',maxHeight: '650px',minWidth:"80wv" } }}
                            />
                        </div>
                    :
                        <center>
                            <div className="loader"></div>
                        </center>
                }
            </div>
        </>
    )
}

export default BannerList