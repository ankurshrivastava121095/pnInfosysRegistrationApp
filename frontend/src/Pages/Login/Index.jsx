/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../Features/Auth/AuthSlice";

const LoginIndex = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { auth, success, message, error } = useSelector(
        (state) => state.auth
    );

    const fields = {
        email: '',
        password: '',
    }

    const [data, setData] = useState(fields);
    const [loading, setLoading] = useState(false)
    const [handleHideShowPass, setHandleHideShowPass] = useState(true)
    const [handlePassType, setHandlePassType] = useState('password')

    const handleInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    
    useEffect(()=>{
        if(handleHideShowPass === false){
            setHandlePassType('text')
        }
        if(handleHideShowPass === true){
            setHandlePassType('password')
        }
    },[handleHideShowPass])

    useEffect(()=>{
        if (success === true && message === 'Logged In') {
            navigate('/admin/dashboard');
        }
    },[success, message])

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setLoading(true)
        dispatch(userLogin(data))
    };

    return(
        <>
            <div className="container">
                <div className="row mt-5 mb-5 bg-nav rounded">
                <div className="col-md-12">
                    <div className="container">
                        <div className="row mt-5 mb-5">
                            <div className="col-md-6">
                                <img src="https://self.staffinggo.in/assets/Assets/Login_Icons/Login_Page_Image.svg" className="w-100 mb-5 mt-3 rounded" alt="" />
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-4 bg-white stylish-rounded">
                                <h1 className="text-center fst-italic pt-3 mt-5 fw-bold fs-48px"><i className="fa-solid fa-right-to-bracket"></i> Login</h1>
                                <form onSubmit={handleSubmit}>
                                    <div className="input-field mb-4">
                                        <input 
                                            type="text" 
                                            id="email" 
                                            name="email"
                                            value={data?.email}
                                            onChange={handleInput}
                                            className='input-text-field' 
                                            required 
                                        />
                                        <label htmlFor="email" className='label-text'>Email</label>
                                    </div>
                                    <div className="input-field mb-4">
                                        <input 
                                            type={handlePassType} 
                                            id="password" 
                                            name="password"
                                            value={data?.password}
                                            onChange={handleInput}
                                            className='input-text-field' 
                                            required 
                                        />
                                        <label htmlFor="password" className='label-text'>Password</label>
                                    </div>
                                    {
                                        handleHideShowPass === true ?
                                        <>
                                            <span role="button" onClick={()=> setHandleHideShowPass(!handleHideShowPass)}><i className="fa-solid fa-eye"></i> Show Password</span>
                                        </>
                                        :
                                        <>
                                            <span role="button" onClick={()=> setHandleHideShowPass(!handleHideShowPass)}><i className="fa-solid fa-eye-slash"></i> Hide Password</span>
                                        </>
                                    }
                                    <br /><br />
                                    {
                                        !loading ?
                                            <button type='submit' className='btn btn-lightBlue w-100'>Login</button>
                                        :
                                        <>
                                            <center>
                                                <div className="smallLoader"></div>
                                            </center>
                                        </>
                                    }
                                </form>
                            </div>
                            <div className="col-md-1"></div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}
export default LoginIndex