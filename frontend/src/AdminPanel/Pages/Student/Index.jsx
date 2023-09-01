import React from 'react'
import { Outlet } from 'react-router-dom'

function StudentIndex() {
    return (
        <>
            <div className='container bg-white rounded'>
                <div className='row'>
                    <div className='col-md-12 p-0'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default StudentIndex