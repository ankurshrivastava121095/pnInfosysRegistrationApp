/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from '../../../Features/Contacts/ContactSlice';

function CourseList() {

    const dispatch = useDispatch()

    const { contacts, responseStatus, responseMessage } = useSelector(
        (state) => state.contacts
    );

    const [data, setData] = useState([])

    useEffect(()=>{
        getAllCourses()
    },[])

    const getAllCourses = async() => {
        dispatch(getContacts())
    }

    const columns = useMemo(() => [
        {
            header: "Name",
            accessorKey: "name",
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
            header: "Message",
            accessorKey: "message",
            enableGlobalFilter: true,
        },
        {
            header: "Date & Time",
            accessorKey: "createdAt",
            enableGlobalFilter: true,
        },
    ]);

    useEffect(() => {
        if (contacts?.data && contacts.data.length > 0) {
          setData(contacts.data);
        }
    }, [contacts]);

    return (
        <>
            <div className='bg-GrayDiv'>
                <div style={{ overflow:'auto',maxWidth:'100%',borderWidth:'2px',borderColor:'#eee',borderStyle:'solid'}}>
                    <MaterialReactTable
                        data={data}
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

export default CourseList