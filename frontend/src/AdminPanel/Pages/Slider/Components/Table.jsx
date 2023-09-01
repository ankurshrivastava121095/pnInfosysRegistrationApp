/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSlider, getSliders } from '../../../../Features/Sliders/SliderSlice';


function SliderList() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { sliders, responseStatus, responseMessage } = useSelector(
        (state) => state.sliders
    );

    const [allSliders, setAllSliders] = useState([]);
    const [loading, setLoading] = useState(true)

    const handleDelete = (id) => {
        dispatch(deleteSlider(id))
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
                        <button type="button" className='btn btn-sm btn-theme' onClick={() => navigate(`/admin/slider/sliderEdit/${val?._id}`)}><i className="fa-solid fa-pen-to-square"></i></button>
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
            accessorKey: "sliderStatus",
            enableGlobalFilter: true,
        },
    ]);

    const fetchSliders = () => {
        dispatch(getSliders());
    }

    useEffect(()=>{
        fetchSliders()
    },[])

    useEffect(() => {
        if (sliders?.data && sliders.data.length > 0) {
            setAllSliders(sliders.data);
        }
    }, [sliders]);

    useEffect(()=>{
        if (responseStatus == 'success') {
            setLoading(false)
        }
    },[sliders])

    useEffect(()=>{
        if (responseStatus === 'success' && responseMessage === 'Slider deleted successfully') {
            setLoading(false)
            showSuccessToast(responseMessage)
            fetchSliders()
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
                    <button type="button" className='btn btn-darkBlue mb-3' onClick={() => navigate('/admin/slider/addSlider')}><i className="fa-solid fa-plus"></i> Add New</button>
                </div>
                <div style={{ overflow:'auto',maxWidth:'100%',borderWidth:'2px',borderColor:'#eee',borderStyle:'solid'}}>
                    <MaterialReactTable
                        data={allSliders}
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
            </div>
        </>
    )
}

export default SliderList