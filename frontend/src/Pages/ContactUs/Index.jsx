/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createContact } from "../../Features/Contacts/ContactSlice";
import { useEffect } from "react";

const ContactUsIndex = () =>{

    const dispatch = useDispatch();

    const { contacts, responseStatus, responseMessage } = useSelector(
        (state) => state.contacts
    );

    var fields = {
        name : '',
        email : '',
        mobileNumber : '',
        message : '',
    }

    const [data, setData] = useState(fields)
    const [loading, setLoading] = useState(false)
    const [showResponse, setShowResponse] = useState(false)
    const [responseText, setResponseText] = useState('')
    const [responseTextColor, setResponseTextColor] = useState('')

    const handleInput = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        // console.log(formData)

        setLoading(true)
        
        dispatch(createContact(data));
    }

    useEffect(()=>{
        if (responseMessage === 'Contact created successfully') {
            setLoading(false)
            setShowResponse(true)   
            setResponseText('We have received your message and will reach you soon !')
            setResponseTextColor('success')  
        } 
        if (responseStatus === 'rejected') {
            setLoading(false)
            setShowResponse(true)   
            setResponseText('Something went wrong, Try again !')
            setResponseTextColor('danger')  
        }
    },[contacts, responseMessage])

    return(
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <img src="https://doi-ds.org/images/upload/contact_us.jpg" className="w-100" alt="" />
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 mt-5'>
                        <h6><i className="fa-solid fa-envelope"></i> Email</h6>
                        <p>www.pninfosys.com <br /> support@pninfosys.com</p><br />
                        <h6><i className="fa-solid fa-phone"></i> Phone</h6>
                        <p>+91 7000846823 <br /> +91 7415289378</p><br />
                        <h6><i className="fa-solid fa-location-dot"></i> Street Address</h6>
                        <p>MIG-332 Darpan Colony,Thatipur, Gwalior,Madhya Pradesh</p>
                    </div>
                    <div className='col-md-6 mt-4 mb-5 border border-dark stylish-rounded shadow p-4'>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-field mb-4">
                                            <input 
                                                type="text" 
                                                id="name" 
                                                name="name" 
                                                className='input-text-field' 
                                                required 
                                                onChange={handleInput}
                                            />
                                            <label htmlFor="name" className='label-text'>Name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-field mb-4">
                                            <input 
                                                type="text" 
                                                id="email" 
                                                name="email" 
                                                className='input-text-field' 
                                                required 
                                                onChange={handleInput}
                                            />
                                            <label htmlFor="email" className='label-text'>Email</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="input-field mb-4">
                                <input 
                                    type="text" 
                                    id="mobileNumber" 
                                    name="mobileNumber" 
                                    className='input-text-field' 
                                    required 
                                    onChange={handleInput}
                                />
                                <label htmlFor="mobileNumber" className='label-text'>Mobile Number</label>
                            </div>
                            <div className="input-field mb-5">
                                <textarea 
                                    id="message" 
                                    name="message" 
                                    className='input-text-field' 
                                    required
                                    onChange={handleInput}
                                ></textarea>
                                <label htmlFor="message" className='label-text'>Message</label>
                            </div>
                            <br />
                            {
                                showResponse ?
                                <><div className={`text-${responseTextColor} border border-${responseTextColor} rounded fw-bold rounded p-2 mt-3`}>{responseText}</div></>
                                :
                                ''
                            }
                            {
                                !loading ?
                                    <button type='submit' className='btn btn-lightBlue mt-4 w-100'>Send</button>
                                :
                                <center>
                                    <div className="smallLoader"></div>
                                </center>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ContactUsIndex