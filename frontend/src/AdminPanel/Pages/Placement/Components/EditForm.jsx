import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPlacement, updatePlacement } from "../../../../Features/Placements/PlacementSlice";
import { ToastContainer, toast } from "react-toastify";

function PlacementEditForm() {

  const dispatch = useDispatch()
  const param = useParams()

  const placedStudentID = param.id

  const { placements, responseStatus, responseMessage } = useSelector(
    (state) => state.placements
  );

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [placedStudentImage, setPlacedStudentImage] = useState("");
  const [showCurrentImage, setShowCurrentImage] = useState("");

  const getCourseDetail = async() => {
    dispatch(getPlacement(placedStudentID))
  }
      
  useEffect(()=>{
      getCourseDetail()
  },[])

  useEffect(()=>{
    setLoading(false)
    setName(placements?.data?.name)
    setCompany(placements?.data?.company)
    setDesignation(placements?.data?.designation)
    setShowCurrentImage(placements?.data?.placedStudentImage?.url)
  },[placements])

  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)

    const placedStudent_Data = {
      _id: placedStudentID,
      name: name,
      company: company,
      designation: designation,
      placedStudentImage: placedStudentImage,
    };

    dispatch(updatePlacement(placedStudent_Data));
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
  },[placements])

  useEffect(()=>{
    if (responseStatus === 'success' && responseMessage === 'Placed Student updated successfully') {
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
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <div className="row mb-3">
                    <div className="col-md-12">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required="required"
                            />
                            <label htmlFor="name" className="inputLabel">
                                Name
                            </label>
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-12">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                id="company"
                                name="company"
                                className="form-control"
                                placeholder="Company"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                required="required"
                            />
                            <label htmlFor="name" className="inputLabel">
                                Company
                            </label>
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-12">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                id="designation"
                                name="designation"
                                className="form-control"
                                placeholder="designation"
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                                required="required"
                            />
                            <label htmlFor="name" className="inputLabel">
                                Designation
                            </label>
                        </div>
                    </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="row">
                  <div className="col-md-12 d-flex gap-15">
                    <label
                      role="button"
                      htmlFor="placedStudentImage"
                      className="text-nowrap mt-4 inputLabel"
                    >
                      Student Image:
                    </label>
                    <input
                      type="file"
                      id="placedStudentImage"
                      name="placedStudentImage"
                      className="mt-4"
                      onChange={(e) => setPlacedStudentImage(e.target.files[0])}
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
                  Update
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlacementEditForm;
