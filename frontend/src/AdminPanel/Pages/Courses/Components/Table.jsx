import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React, { useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { deleteCourse, getCourses } from '../../../../Features/Courses/CourseSlice';

function CourseList() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { courses, responseStatus, responseMessage } = useSelector(
        (state) => state.courses
    );

    const [allCourses, setAllCourses] = useState([]);
    const [loading, setLoading] = useState(true)

    const handleDelete = (id) => {
        dispatch(deleteCourse(id))
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
                        <button type="button" className='btn btn-sm btn-theme' onClick={() => navigate(`/admin/courses/courseView/${val?._id}`)}><i className="fa-solid fa-eye"></i></button>
                        <button type="button" className='btn btn-sm btn-theme' onClick={() => navigate(`/admin/courses/courseEdit/${val?._id}`)}><i className="fa-solid fa-pen-to-square"></i></button>
                        <button type="button" className='btn btn-sm btn-theme' onClick={() => handleDelete(val._id)}><i className="fa-solid fa-trash-can"></i></button>    
                    </div>
                )
            }
        },
        {
            header: "Name",
            accessorKey: "courseName",
            enableGlobalFilter: true,
        },
        {
            header: "Duration",
            accessorKey: "duration",
            enableGlobalFilter: true,
        },
        {
            header: "Fees (in Rs.)",
            accessorKey: "fees",
            enableGlobalFilter: true,
        },
    ]);

    const fetchCourses = () => {
        dispatch(getCourses());
    }

    useEffect(()=>{
        fetchCourses()
    },[])

    useEffect(() => {
        if (courses?.data && courses.data.length > 0) {
          setAllCourses(courses.data);
        }
    }, [courses]);

    useEffect(()=>{
        if (responseStatus == 'success') {
            setLoading(false)
        }
    },[courses])

    useEffect(()=>{
        if (responseStatus === 'success' && responseMessage === 'Course deleted successfully') {
            setLoading(false)
            showSuccessToast(responseMessage)
            fetchCourses()
        }
        if (responseStatus === 'rejected') {
            setLoading(false)
            showFailToast(responseMessage)
        }
    },[responseMessage])
    
    return (
        <>
            <div className='bg-GrayDiv'>
                <div className='d-flex flex-wrap justify-content-between'>
                    <div>&nbsp;</div>
                    <button type="button" className='btn btn-darkBlue mb-3' onClick={() => navigate('/admin/courses/addCourse')}><i className="fa-solid fa-plus"></i> Add New</button>
                </div>
                <ToastContainer />
                {
                    !loading ?
                        <div style={{ overflow:'auto',maxWidth:'100%',borderWidth:'2px',borderColor:'#eee',borderStyle:'solid'}}>
                            <MaterialReactTable
                                data={allCourses}
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

export default CourseList