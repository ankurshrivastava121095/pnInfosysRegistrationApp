import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getCourses } from "../../Features/Courses/CourseSlice"

const CoursesIndex = () =>{

    const dispatch = useDispatch()

    const [allCourses,setAllCourses] = useState([])
    const [loading, setLoading] = useState(true)

    const { courses, responseStatus, responseMessage } = useSelector(
        (state) => state.courses
    );

    const getAllCourses = () => {
        dispatch(getCourses());
    }

    useEffect(()=>{
        setAllCourses(courses?.data)
    },[courses])

    useEffect(()=>{
        if (responseStatus == 'success') {
            setLoading(false)
        }
    },[allCourses])
    
    useEffect(() => {
        getAllCourses();
    }, []);

    return(
        <>
            <div className="container-fuild">
                <h1 className="text-center fst-italic pt-3 mb-4 mt-5 fw-bold fs-48px"><i className="fa-solid fa-code"></i> POPULAR COURSES</h1>
                {
                    !loading ?
                        Array.isArray(allCourses) && allCourses.map((val,index)=>
                            <div className={`container-fluid ${index % 2 === 0 ? 'coursePageBg' : ''} p-3`} key={index}>
                                <div className="container">
                                    <div className="d-flex flex-wrap align-items-baseline justify-content-between">
                                        <div>
                                            <h1 className="mt-5 heading">{val.courseName}</h1><br />
                                            <span className="fw-bold">Course Duration - {val.duration}</span><br />
                                            <span className="fw-bold">Course Fees - {val.fees}/-</span>
                                        </div>
                                        <Link to={`/register/${val._id}`} className='btn btn-lightBlue'>Apply Now</Link>
                                    </div>
                                    <hr />
                                    <div className="row mt-5 m-3">
                                        {
                                            val.languageOne != '' ?
                                                <div className="col-md-3">
                                                    <center>
                                                        <div>
                                                            <center><i style={{color: '#'+val.languageOneIconColor, fontSize:"175px"}} className={val.languageOneIcon}></i></center>
                                                            <h1 className="text-center">{val.languageOne}</h1>
                                                        </div>
                                                    </center>
                                                </div>
                                            :
                                            ''
                                        }
                                        {
                                            val.languageTwo != '' ?
                                            <div className="col-md-3">
                                                <center>
                                                    <div>
                                                        <i style={{color: '#'+val.languageTwoIconColor, fontSize:"175px"}} className={val.languageTwoIcon}></i>
                                                        <h1 className="text-center">{val.languageTwo}</h1>
                                                    </div>
                                                </center>
                                            </div>
                                            :
                                            ''
                                        }
                                        {
                                            val.languageThree != '' ?
                                            <div className="col-md-3">
                                                <center>
                                                    <div>
                                                        <i style={{color: '#'+val.languageThreeIconColor, fontSize:"175px"}} className={val.languageThreeIcon}></i>
                                                        <h1 className="text-center">{val.languageThree}</h1>
                                                    </div>
                                                </center>
                                            </div>
                                            :
                                            ''
                                        }
                                        {
                                            val.languageFour != '' ?
                                            <div className="col-md-3">
                                                <center>
                                                    <div>
                                                        <i style={{color: '#'+val.languageFourIconColor, fontSize:"175px"}} className={val.languageFourIcon}></i>
                                                        <h1 className="text-center">{val.languageFour}</h1>
                                                    </div>
                                                </center>
                                            </div>
                                            :
                                            ''
                                        }
                                        {
                                            val.databaseName != '' ?
                                            <div className="col-md-3">
                                                <center>
                                                    <div>
                                                        <i style={{color: '#'+val.databaseIconColor, fontSize:"175px"}} className={val.databaseIcon}></i>
                                                        <h1 className="text-center">{val.databaseName}</h1>
                                                    </div>
                                                </center>
                                            </div>
                                            :
                                            ''
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    :
                    <>
                        <center>
                            <div className="loader"></div>
                        </center>
                    </>
                }
            </div>
        </>
    )
}
export default CoursesIndex