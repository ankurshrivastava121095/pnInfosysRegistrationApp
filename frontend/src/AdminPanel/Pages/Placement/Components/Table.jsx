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
import SliderAddForm from './AddForm';
import PlacementAddForm from './AddForm';
import PlacementView from './View';
import PlacementEditForm from './EditForm';
import { useDispatch, useSelector } from 'react-redux';
import { deletePlacement, getPlacements } from '../../../../Features/Placements/PlacementSlice';

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

function PlacementList() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { placements, responseStatus, responseMessage } = useSelector(
        (state) => state.placements
    );

    const [allPlacedStudents, setAllPlacedStudents] = useState([]);
    const [loading, setLoading] = useState(true)

    const handleDelete = (id) => {
        dispatch(deletePlacement(id))
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
                        <button type="button" className='btn btn-sm btn-theme' onClick={() => navigate(`/admin/placement/placementView/${val?._id}`)}><i className="fa-solid fa-eye"></i></button>
                        <button type="button" className='btn btn-sm btn-theme' onClick={() => navigate(`/admin/placement/placementEdit/${val?._id}`)}><i className="fa-solid fa-pen-to-square"></i></button>
                        <button type="button" className='btn btn-sm btn-theme' onClick={() => handleDelete(val._id)}><i className="fa-solid fa-trash-can"></i></button>    
                    </div>
                )
            }
        },
        {
            header: "Name",
            accessorKey: "name",
            enableGlobalFilter: true,
        },
        {
            header: "Company",
            accessorKey: "company",
            enableGlobalFilter: true,
        },
    ]);

    const fetchPlacedStudents = () => {
        dispatch(getPlacements());
    }

    useEffect(()=>{
        fetchPlacedStudents()
    },[])

    useEffect(() => {
        if (placements?.data && placements.data.length > 0) {
            setAllPlacedStudents(placements.data);
        }
    }, [placements]);

    useEffect(()=>{
        if (responseStatus == 'success') {
            setLoading(false)
        }
    },[placements])

    useEffect(()=>{
        if (responseStatus === 'success' && responseMessage === 'Placed Student deleted successfully') {
            setLoading(false)
            showSuccessToast(responseMessage)
            fetchPlacedStudents()
        }
        if (responseStatus === 'rejected') {
            setLoading(false)
            showFailToast(responseMessage)
        }
    },[responseMessage])

    return (
        <>
            <ToastContainer />
            <div className='bg-GrayDiv'>
                <div className='d-flex flex-wrap justify-content-between'>
                    <div>&nbsp;</div>
                    <button type="button" className='btn btn-darkBlue mb-3' onClick={() => navigate('/admin/placement/addPlacedStudent')}><i className="fa-solid fa-plus"></i> Add New</button>
                </div>
                <ToastContainer />
                {
                    !loading ?
                        <div style={{ overflow:'auto',maxWidth:'100%',borderWidth:'2px',borderColor:'#eee',borderStyle:'solid'}}>
                            <MaterialReactTable
                                data={allPlacedStudents}
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

export default PlacementList