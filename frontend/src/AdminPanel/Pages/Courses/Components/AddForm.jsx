import React, { useEffect } from "react";
import { useState } from "react";
import { SketchPicker } from "react-color";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../../../../Features/Courses/CourseSlice";

function CourseAddForm() {
  const [sketcher, setStetcher] = useState({
    r: "241",
    g: "112",
    b: "19",
    a: "1",
  });
  // destructuring rgba from state
  const { r, g, b, a } = sketcher;

  const dispatch = useDispatch();

  const { courses, responseStatus, responseMessage } = useSelector(
    (state) => state.courses
  );

  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const courseData = new FormData();
      courseData.append("courseName", courseName);
      courseData.append("databaseName", databaseName);
      courseData.append("languageOne", languageOne);
      courseData.append("languageTwo", languageTwo);
      courseData.append("languageThree", languageThree);
      courseData.append("languageFour", languageFour);
      courseData.append("duration", duration);
      courseData.append("fees", fees);
      courseData.append("description", description);
      courseData.append("databaseIcon", databaseIcon);
      courseData.append("databaseIconColor", databaseIconColor);
      courseData.append("languageOneIcon", languageOneIcon);
      courseData.append("languageOneIconColor", languageOneIconColor);
      courseData.append("languageTwoIcon", languageTwoIcon);
      courseData.append("languageTwoIconColor", languageTwoIconColor);
      courseData.append("languageThreeIcon", languageThreeIcon);
      courseData.append("languageThreeIconColor", languageThreeIconColor);
      courseData.append("languageFourIcon", languageFourIcon);
      courseData.append("languageFourIconColor", languageFourIconColor);
      courseData.append("courseImage", courseImage);

      // console.log(courseData.courseName);

      dispatch(createCourse(courseData));

    } catch (err) {
      // console.log(err)
      if (err.res.data.status === "404") {
      }
    }
  };

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
    if (responseStatus === 'success' && responseMessage === 'Course created successfully') {
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
      <div className="bg-GrayDiv">
        <ToastContainer />
        <div className="row">
          <div className="col-md-12 border-darkBlue p-4">
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
                        // onChange={onHandleChange}
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
                        // onChange={onHandleChange}
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
                        // onChange={onHandleChange}
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
                        // onChange={onHandleChange}
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
                        onChange={(e) => setLanguageOneIconColor(e.target.value)}
                      />
                      <label htmlFor="languageOneIconColor" className="inputLabel">
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
                        // onChange={onHandleChange}
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
                        onChange={(e) => setLanguageTwoIconColor(e.target.value)}
                      />
                      <label htmlFor="languageTwoIconColor" className="inputLabel">
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
                        // onChange={onHandleChange}
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
                        onChange={(e) => setLanguageThreeIconColor(e.target.value)}
                      />
                      <label htmlFor="languageThreeIconColor" className="inputLabel">
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
                        // onChange={onHandleChange}
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
                        onChange={(e) => setLanguageFourIconColor(e.target.value)}
                      />
                      <label htmlFor="languageFourIconColor" className="inputLabel">
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
                  // onChange={onHandleChange}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <label htmlFor="description" className="inputLabel">
                  Description
                </label>
              </div>
              <div className='row'>
                <div className='col-md-12'>
                  <label role='button' htmlFor="courseImage" className='text-nowrap mt-4 inputLabel'>Course Banner Image:</label>
                  <input 
                    type="file" 
                    id="courseImage" 
                    name='courseImage'
                    className='mt-4' 
                    // onChange={onHandleImageChange}
                    onChange={(e)=>setCourseImage(e.target.files[0])}
                    required
                  />
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
  );
}

export default CourseAddForm;
