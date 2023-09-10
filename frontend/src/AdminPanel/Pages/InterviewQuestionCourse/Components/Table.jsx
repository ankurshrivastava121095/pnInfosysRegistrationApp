/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteInterviewQuestionCourse, getAllInterviewQuestionCourses } from '../../../../Features/InterviewQuestionCourse/InterviewQuestionCourseSlice';

function InterviewQuestionCourseList() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { interviewQuestionCourses, responseStatus, responseMessage } = useSelector(
        (state) => state.interviewQuestionCourses
    );

    const [allCourses, setAllCourses] = useState([]);
    const [loading, setLoading] = useState(true)

    const handleDelete = (id) => {
        dispatch(deleteInterviewQuestionCourse(id))
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
                        <button type="button" className='btn btn-sm btn-theme' onClick={() => navigate(`/admin/interviewQuestionCourse/interviewQuestionCourseView/${val?._id}`)}><i className="fa-solid fa-eye"></i></button>
                        <button type="button" className='btn btn-sm btn-theme' onClick={() => navigate(`/admin/interviewQuestionCourse/interviewQuestionCourseEdit/${val?._id}`)}><i className="fa-solid fa-pen-to-square"></i></button>
                        <button type="button" className='btn btn-sm btn-theme' onClick={() => handleDelete(val._id)}><i className="fa-solid fa-trash-can"></i></button>    
                    </div>
                )
            }
        },
        {
            header: "Question",
            accessorKey: "question",
            enableGlobalFilter: true,
        },
        {
            header: "Course Name",
            accessorKey: "courseName",
            enableGlobalFilter: true,
        },
    ]);

    const fetchInterviewQuestionCourses = () => {
        dispatch(getAllInterviewQuestionCourses());
    }

    useEffect(()=>{
        fetchInterviewQuestionCourses()
    },[])

    useEffect(() => {
        if (interviewQuestionCourses?.data && interviewQuestionCourses.data.length > 0) {
            setAllCourses(interviewQuestionCourses.data);
        }
    }, [interviewQuestionCourses]);

    useEffect(()=>{
        if (responseStatus === 'success') {
            setLoading(false)
        }
    },[interviewQuestionCourses])

    useEffect(()=>{
        if (responseStatus === 'success' && responseMessage === 'Course deleted successfully') {
            setLoading(false)
            showSuccessToast(responseMessage)
            fetchInterviewQuestionCourses()
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
                    <button type="button" className='btn btn-darkBlue mb-3' onClick={() => navigate('/admin/interviewQuestionCourse/addInterviewQuestionCourse')}><i className="fa-solid fa-plus"></i> Add New</button>
                </div>
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

export default InterviewQuestionCourseList