import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import '../../Assets/Style.css'


const Slider = () => {

    const [allSliders, setAllSliders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        getAllSlider()
    },[])

    const getAllSlider = async() => {
        const res = await axios.get(`${process.env.REACT_APP_URL_ENDPOINT}/getAllSlider`)
        // console.log(res.data.data)
        setAllSliders(res.data.data)
        setLoading(false)
    }

    return(
        <>
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="false">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    {
                        !loading ?
                            allSliders && allSliders.map((val,key)=>(
                                <div className={`carousel-item ${key === 0 ? 'active' : ''}`}>
                                    <img src={val?.sliderImage?.url} className="d-block w-100 sliderHeight" alt="slider1" />
                                </div>
                            ))
                        :
                            <center>
                                <div className="loader"></div>
                            </center>
                    }
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}
export default Slider