import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React, { useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { deleteStudent, getStudents } from '../../../../Features/Students/StudentSlice';

function StudentList() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { students, responseStatus, responseMessage } = useSelector(
        (state) => state.students
    );

    const [allStudents, setAllStudents] = useState([]);
    const [loading, setLoading] = useState(true)

    const handleDelete = (id) => {
        dispatch(deleteStudent(id))
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
                        <button type="button" className='btn btn-sm btn-theme' onClick={() => navigate(`/admin/student/studentView/${val?._id}`)}><i className="fa-solid fa-eye"></i></button>
                        <button type="button" className='btn btn-sm btn-theme' onClick={() => navigate(`/admin/student/studentEdit/${val?._id}`)}><i className="fa-solid fa-pen-to-square"></i></button>
                        <button type="button" className='btn btn-sm btn-theme' onClick={() => handleDelete(val._id)}><i className="fa-solid fa-trash-can"></i></button>    
                    </div>
                )
            }
        },
        {
            header: "Name",
            accessorKey: "studentName",
            enableGlobalFilter: true,
        },
        {
            header: "Email",
            accessorKey: "email",
            enableGlobalFilter: true,
        },
        {
            header: "Mobile Number",
            accessorKey: "mobileNumber",
            enableGlobalFilter: true,
        },
        {
            header: "Applied For",
            accessorKey: "courseId",
            enableGlobalFilter: true,
        },
    ]);

    const fetchStudents = () => {
        dispatch(getStudents());
    }

    useEffect(()=>{
        fetchStudents()
    },[])

    useEffect(()=>{
        if (students?.data && students.data.length > 0) {
            setAllStudents(students?.data)
        }
    },[students])

    useEffect(()=>{
        if (responseStatus == 'success') {
            setLoading(false)
        }
    },[students])

    useEffect(()=>{
        if (responseStatus === 'success' && responseMessage === 'Student deleted successfully') {
            setLoading(false)
            showSuccessToast(responseMessage)
            fetchStudents()
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
                {
                    !loading ?
                        <div style={{ overflow:'auto',maxWidth:'100%',borderWidth:'2px',borderColor:'#eee',borderStyle:'solid'}}>
                            <MaterialReactTable
                                data={allStudents}
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

export default StudentList