import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

function ContactUsMessageView({messageID, setViewDrawer}) {

    const message_id = messageID

    const [messageData, setMessageData] = useState([])

    const getMessageDetail = async() => {
        const {data} = await axios.get(`${process.env.REACT_APP_URL_ENDPOINT}/messageDetail/${message_id}`);
        setMessageData(data.data)
    }
        
    useEffect(()=>{
        getMessageDetail()
    },[])

    return (
        <>
            <div className="offcanvas-header bg-darkBlue text-white p-3">
                <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Message Detail</h5>
                <button type="button" className="rounded-circle" onClick={()=>setViewDrawer(false)}>X</button>
            </div>
            <div className='bg-GrayDiv'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div>
                            <table className='table table-bordered fs-4 bg-lightBlue rounded'>
                                <tr className=''>
                                    <th className='text-darkBlue ps-4'>Name</th>
                                    <td className='text-darkBlue text-right pe-4'>{messageData.name}</td>
                                </tr>
                                <tr className=''>
                                    <th className='text-darkBlue ps-4'>Email</th>
                                    <td className='text-darkBlue text-right pe-4'>{messageData.email}</td>
                                </tr>
                                <tr className=''>
                                    <th className='text-darkBlue ps-4'>Mobile Number</th>
                                    <td className='text-darkBlue text-right pe-4 text-right'>{messageData.mobileNumber}</td>
                                </tr>
                                <tr className=''>
                                    <th className='text-darkBlue ps-4'>Message</th>
                                    <td className='text-darkBlue text-right pe-4'>{messageData.message}</td>
                                </tr>
                                <tr className=''>
                                    <th className='text-darkBlue ps-4'>Date & Time</th>
                                    <td className='text-darkBlue text-right pe-4'>{messageData.createdAt}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactUsMessageView