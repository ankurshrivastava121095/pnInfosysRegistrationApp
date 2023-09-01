/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCourse, updateCourse } from '../../../../Features/Courses/CourseSlice';
import { ToastContainer, toast } from 'react-toastify';

function CourseEditForm() {

  const dispatch = useDispatch()
  const param = useParams()

  const courseID = param.id

  const { courses, responseStatus, responseMessage } = useSelector(
    (state) => state.courses
  );

  const [loading, setLoading] = useState(true);
  const [sketcher, setStetcher] = useState({
    r: "241",
    g: "112",
    b: "19",
    a: "1",
  });
  // destructuring rgba from state
  const { r, g, b, a } = sketcher;

  const [courseName, setCourseName] = useState("");
  const [databaseName, setDatabaseName] = useState("");
  const [languageOne, setLanguageOne] = useState("");
  const [languageTwo, setLanguageTwo] = useState("");
  const [languageThree, setLanguageThree] = useState("");
  const [languageFour, setLanguageFour] = useState("");
  const [databaseIcon, setDatabaseIcon] = useState("");
  const [databaseIconColor, setDatabaseIconColor] = useState("");
  const [languageOneIcon, setLanguageOneIcon] = useState("");
  const [languageOneIconColor, setLanguageOneIconColor] = useState("");
  const [languageTwoIcon, setLanguageTwoIcon] = useState("");
  const [languageTwoIconColor, setLanguageTwoIconColor] = useState("");
  const [languageThreeIcon, setLanguageThreeIcon] = useState("");
  const [languageThreeIconColor, setLanguageThreeIconColor] = useState("");
  const [languageFourIcon, setLanguageFourIcon] = useState("");
  const [languageFourIconColor, setLanguageFourIconColor] = useState("");
  const [duration, setDuration] = useState("");
  const [fees, setFees] = useState("");
  const [description, setDescription] = useState("");
  const [courseImage, setCourseImage] = useState("");
  const [showCurrentImage, setShowCurrentImage] = useState("");

  const getCourseDetail = async() => {
      dispatch(getCourse(courseID))
  }
      
  useEffect(()=>{
      getCourseDetail()
  },[])

  useEffect(()=>{
    setLoading(false)
    setCourseName(courses?.data?.courseName)
    setDatabaseName(courses?.data?.databaseName)
    setLanguageOne(courses?.data?.languageOne)
    setLanguageTwo(courses?.data?.languageTwo)
    setLanguageThree(courses?.data?.languageThree)
    setLanguageFour(courses?.data?.languageFour)
    setDatabaseIcon(courses?.data?.databaseIcon)
    setDatabaseIconColor(courses?.data?.databaseIconColor)
    setLanguageOneIcon(courses?.data?.languageOneIcon)
    setLanguageOneIconColor(courses?.data?.languageOneIconColor)
    setLanguageTwoIcon(courses?.data?.languageTwoIcon)
    setLanguageTwoIconColor(courses?.data?.languageTwoIconColor)
    setLanguageThreeIcon(courses?.data?.languageThreeIcon)
    setLanguageThreeIconColor(courses?.data?.languageThreeIconColor)
    setLanguageFourIcon(courses?.data?.languageFourIcon)
    setLanguageFourIconColor(courses?.data?.languageFourIconColor)
    setDuration(courses?.data?.duration)
    setFees(courses?.data?.fees)
    setDescription(courses?.data?.description)
    setShowCurrentImage(courses?.data?.courseImage?.url)
  },[courses])

  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)

    const course_Data = {
      _id: courseID,
      courseName: courseName,
      databaseName: databaseName,
      languageOne: languageOne,
      languageTwo: languageTwo,
      languageThree: languageThree,
      languageFour: languageFour,
      duration: duration,
      fees: fees,
      description: description,
      databaseIcon: databaseIcon,
      databaseIconColor: databaseIconColor,
      languageOneIcon: languageOneIcon,
      languageOneIconColor: languageOneIconColor,
      languageTwoIcon: languageTwoIcon,
      languageTwoIconColor: languageTwoIconColor,
      languageThreeIcon: languageThreeIcon,
      languageThreeIconColor: languageThreeIconColor,
      languageFourIcon: languageFourIcon,
      languageFourIconColor: languageFourIconColor,
      courseImage: courseImage,
    };

    dispatch(updateCourse(course_Data));
  }

  const showSuccessToast = (succMessage) => {
    toast.success(succMessage);
  }

  const showFailToast = (errMessage) => {
      toast.error(errMessage);
  }

  useEffect(()=>{
    if (responseStatus == 'success') {
        setLoading(false)
    }
  },[courses])

  useEffect(()=>{
    if (responseStatus === 'success' && responseMessage === 'Course updated successfully') {
        setLoading(false)
        showSuccessToast(responseMessage)
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
        <div className='row'>
          <div className='col-md-12 border-darkBlue p-4'>
            <div className="row">
              <div className="col-md-7">
                Pick Color:
              </div>
              <div className="col-md-5">
                <div className="sketchpicker">
                  <SketchPicker onChange={(color) => {setStetcher(color.rgb);}} color={sketcher} />
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <div className="row mb-3">
                  <div className="col-md-12">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        id="courseName"
                        name="courseName"
                        className="form-control"
                        placeholder="Course Name"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        required="required"
                      />
                      <label htmlFor="courseName" className="inputLabel">
                        Course Name
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        id="databaseName"
                        name="databaseName"
                        className="form-control"
                        placeholder="Database Name"
                        value={databaseName}
                        onChange={(e) => setDatabaseName(e.target.value)}
                      />
                      <label htmlFor="databaseName" className="inputLabel">
                        Database Name
                      </label>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        id="databaseIcon"
                        name="databaseIcon"
                        className="form-control"
                        placeholder="Database Icon"
                        value={databaseIcon}
                        onChange={(e) => setDatabaseIcon(e.target.value)}
                      />
                      <label htmlFor="databaseIcon" className="inputLabel">
                        Database Icon
                      </label>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        id="databaseIconColor"
                        name="databaseIconColor"
                        className="form-control"
                        placeholder="Database Icon Color"
                        value={databaseIconColor}
                        onChange={(e) => setDatabaseIconColor(e.target.value)}
                      />
                      <label htmlFor="databaseIconColor" className="inputLabel">
                        Database Icon Color
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        id="languageOne"
                        name="languageOne"
                        className="form-control"
                        placeholder="Language One"
                        value={languageOne}
                        onChange={(e) => setLanguageOne(e.target.value)}
                      />
                      <label htmlFor="languageOne" className="inputLabel">
                        Language One
                      </label>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        id="languageOneIcon"
                        name="languageOneIcon"
                        className="form-control"
                        placeholder="Language One Icon"
                        value={languageOneIcon}
                        onChange={(e) => setLanguageOneIcon(e.target.value)}
                      />
                      <label htmlFor="languageOneIcon" className="inputLabel">
                        Language One Icon
                      </label>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        id="languageOneIconColor"
                        name="languageOneIconColor"
                        className="form-control"
                        placeholder="Language One Icon Color"
                        value={languageOneIconColor}
                        onChange={(e) => setLanguageOneIconColor(e.target.value)}
                      />
                      <label htmlFor="setdatabaseIconColor" className="inputLabel">
                        Language One Icon Color
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        id="languageTwo"
                        name="languageTwo"
                        className="form-control"
                        placeholder="Language Two"
                        value={languageTwo}
                        onChange={(e) => setLanguageTwo(e.target.value)}
                      />
                      <label htmlFor="languageTwo" className="inputLabel">
                        Language Two
                      </label>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        id="languageTwoIcon"
                        name="languageTwoIcon"
                        className="form-control"
                        placeholder="Language Two Icon"
                        value={languageTwoIcon}
                        onChange={(e) => setLanguageTwoIcon(e.target.value)}
                      />
                      <label htmlFor="languageTwoIcon" className="inputLabel">
                        Language Two Icon
                      </label>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        id="languageTwoIconColor"
                        name="languageTwoIconColor"
                        className="form-control"
                        placeholder="Language Two Icon Color"
                        value={languageTwoIconColor}
                        onChange={(e) => setLanguageTwoIconColor(e.target.value)}
                      />
                      <label htmlFor="setdatabaseIconColor" className="inputLabel">
                        Language Two Icon Color
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        id="languageThree"
                        name="languageThree"
                        className="form-control"
                        placeholder="Language Three"
                        value={languageThree}
                        onChange={(e) => setLanguageThree(e.target.value)}
                      />
                      <label htmlFor="languageThree" className="inputLabel">
                        Language Three
                      </label>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        id="languageThreeIcon"
                        name="languageThreeIcon"
                        className="form-control"
                        placeholder="Language Three Icon"
                        value={languageThreeIcon}
                        onChange={(e) => setLanguageThreeIcon(e.target.value)}
                      />
                      <label htmlFor="languageThreeIcon" className="inputLabel">
                        Language Three Icon
                      </label>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        id="languageThreeIconColor"
                        name="languageThreeIconColor"
                        className="form-control"
                        placeholder="Language Three Icon Color"
                        value={languageThreeIconColor}
                        onChange={(e) => setLanguageThreeIconColor(e.target.value)}
                      />
                      <label htmlFor="setdatabaseIconColor" className="inputLabel">
                        Language Three Icon Color
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        id="languageFour"
                        name="languageFour"
                        className="form-control"
                        placeholder="Language Four"
                        value={languageFour}
                        onChange={(e) => setLanguageFour(e.target.value)}
                      />
                      <label htmlFor="languageFour" className="inputLabel">
                        Language Four
                      </label>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        id="languageFourIcon"
                        name="languageFourIcon"
                        className="form-control"
                        placeholder="Language Four Icon"
                        value={languageFourIcon}
                        onChange={(e) => setLanguageFourIcon(e.target.value)}
                      />
                      <label htmlFor="languageFourIcon" className="inputLabel">
                        Language Four Icon
                      </label>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        id="languageFourIconColor"
                        name="languageFourIconColor"
                        className="form-control"
                        placeholder="Language Four Icon Color"
                        value={languageFourIconColor}
                        onChange={(e) => setLanguageFourIconColor(e.target.value)}
                      />
                      <label htmlFor="setdatabaseIconColor" className="inputLabel">
                        Language Four Icon Color
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        id="duration"
                        name="duration"
                        value={duration}
                        className="form-control"
                        placeholder="Course Duration"
                        onChange={(e) => setDuration(e.target.value)}
                      />
                      <label htmlFor="duration" className="inputLabel">
                        Course Duration
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        id="fees"
                        name="fees"
                        value={fees}
                        className="form-control"
                        placeholder="Course Fees"
                        onChange={(e) => setFees(e.target.value)}
                      />
                      <label htmlFor="fees" className="inputLabel">
                        Course Fees
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-floating mb-3">
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  className="form-control h-100px"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <label htmlFor="description" className="inputLabel">
                  Description
                </label>
              </div>
              <div className="mb-3">
                <div className="row">
                    <div className="col-md-12 d-flex gap-15">
                        <label
                            role="button"
                            htmlFor="courseImage"
                            className="text-nowrap mt-4 inputLabel"
                        >
                            Course Image:
                        </label>
                        <input
                            type="file"
                            id="courseImage"
                            name="courseImage"
                            className="mt-4"
                            onChange={(e) => setCourseImage(e.target.files[0])}
                        />
                    </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="row">
                    <div className="col-md-12">
                        <img
                            src={showCurrentImage}
                            style={{ height: "300px" }}
                            alt=""
                        />
                    </div>
                </div>
              </div>
              <br />
              <br />
              {loading ? (
                <center>
                    <div className="smallLoader"></div>
                </center>
              ) : (
                <button type="submit" className="btn btn-darkBlue w-100">
                  Save
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseEditForm