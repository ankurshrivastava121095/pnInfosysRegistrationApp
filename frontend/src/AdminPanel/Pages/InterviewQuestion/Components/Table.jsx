/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteQuestion, getAllQuestions } from '../../../../Features/InterviewQuestions/InterviewQuestionSlice';

function InterviewQuestionList() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { questions, responseStatus, responseMessage } = useSelector(
        (state) => state.questions
    );

    const [allQuestions, setAllQuestions] = useState([]);
    const [loading, setLoading] = useState(true)

    const handleDelete = (id) => {
        dispatch(deleteQuestion(id))
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
                        <button type="button" className='btn btn-sm btn-theme' onClick={() => navigate(`/admin/interviewQuestion/interviewQuestionView/${val?._id}`)}><i className="fa-solid fa-eye"></i></button>
                        <button type="button" className='btn btn-sm btn-theme' onClick={() => navigate(`/admin/interviewQuestion/interviewQuestionEdit/${val?._id}`)}><i className="fa-solid fa-pen-to-square"></i></button>
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

    const fetchQuestions = () => {
        dispatch(getAllQuestions());
    }

    useEffect(()=>{
        fetchQuestions()
    },[])

    useEffect(() => {
        if (questions?.data && questions.data.length > 0) {
            setAllQuestions(questions.data);
        }
    }, [questions]);

    useEffect(()=>{
        if (responseStatus == 'success') {
            setLoading(false)
        }
    },[questions])

    useEffect(()=>{
        if (responseStatus === 'success' && responseMessage === 'Question deleted successfully') {
            setLoading(false)
            showSuccessToast(responseMessage)
            fetchQuestions()
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
                    <button type="button" className='btn btn-darkBlue mb-3' onClick={() => navigate('/admin/interviewQuestion/addInterviewQuestion')}><i className="fa-solid fa-plus"></i> Add New</button>
                </div>
                {
                    !loading ?
                        <div style={{ overflow:'auto',maxWidth:'100%',borderWidth:'2px',borderColor:'#eee',borderStyle:'solid'}}>
                            <MaterialReactTable
                                data={allQuestions}
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

export default InterviewQuestionList