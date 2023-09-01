/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCertificate, getCertificates } from '../../../../Features/Certifications/CertificationSlice';

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

function CertificateList() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { certificates, responseStatus, responseMessage } = useSelector(
        (state) => state.certificates
    );

    const [allCertificates, setAllCertificates] = useState([]);
    const [loading, setLoading] = useState(true)

    const handleDelete = (id) => {
        dispatch(deleteCertificate(id))
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
                        <button type="button" className='btn btn-sm btn-theme' onClick={() => navigate(`/admin/certificate/certificateView/${val?._id}`)}><i className="fa-solid fa-eye"></i></button>
                        <button type="button" className='btn btn-sm btn-theme' onClick={() => navigate(`/admin/certificate/certificateEdit/${val?._id}`)}><i className="fa-solid fa-pen-to-square"></i></button>
                        <button type="button" className='btn btn-sm btn-theme' onClick={() => handleDelete(val._id)}><i className="fa-solid fa-trash-can"></i></button>    
                    </div>
                )
            }
        },
        {
            header: "Student Name",
            accessorKey: "studentName",
            enableGlobalFilter: true,
        },
        {
            header: "Course Name",
            accessorKey: "courseName",
            enableGlobalFilter: true,
        },
    ]);

    const fetchCertificates = () => {
        dispatch(getCertificates());
    }

    useEffect(()=>{
        fetchCertificates()
    },[])

    useEffect(() => {
        if (certificates?.data && certificates.data.length > 0) {
            setAllCertificates(certificates.data);
        }
    }, [certificates]);

    useEffect(()=>{
        if (responseStatus == 'success') {
            setLoading(false)
        }
    },[certificates])

    useEffect(()=>{
        if (responseStatus === 'success' && responseMessage === 'Certificate deleted successfully') {
            setLoading(false)
            showSuccessToast(responseMessage)
            fetchCertificates()
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
                    <button type="button" className='btn btn-darkBlue mb-3' onClick={() => navigate('/admin/certificate/addCertificate')}><i className="fa-solid fa-plus"></i> Add New</button>
                </div>
                {
                    !loading ?
                        <div style={{ overflow:'auto',maxWidth:'100%',borderWidth:'2px',borderColor:'#eee',borderStyle:'solid'}}>
                            <MaterialReactTable
                                data={allCertificates}
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

export default CertificateList