/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCertificate, updateCertificate } from "../../../../Features/Certifications/CertificationSlice";
import { ToastContainer, toast } from "react-toastify";

function CertificateEditForm() {

  const dispatch = useDispatch()
  const param = useParams()

  const certificateID = param.id

  const { certificates, responseStatus, responseMessage } = useSelector(
    (state) => state.certificates
  );

  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [certificateLink, setCertificateLink] = useState('');
  const [certificateImage, setCertificateImage] = useState("");
  const [showCurrentImage, setShowCurrentImage] = useState("");

  const getCertificateDetail = async() => {
    dispatch(getCertificate(certificateID))
  }
      
  useEffect(()=>{
      getCertificateDetail()
  },[])

  useEffect(()=>{
    setLoading(false)
    setStudentName(certificates?.data?.studentName)
    setCourseName(certificates?.data?.courseName)
    setCourseDuration(certificates?.data?.courseDuration)
    setCertificateLink(certificates?.data?.certificateLink)
    setShowCurrentImage(certificates?.data?.certificateImage?.url)
  },[certificates])

  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)

    const certificate_Data = {
      _id: certificateID,
      studentName: studentName,
      courseName: courseName,
      courseDuration: courseDuration,
      certificateLink: certificateLink,
      certificateImage: certificateImage,
    };

    dispatch(updateCertificate(certificate_Data));
  }

  const showSuccessToast = (succMessage) => {
    toast.success(succMessage);
  }

  const showFailToast = (errMessage) => {
      toast.error(errMessage);
  }

  useEffect(()=>{
    if (responseStatus === 'success') {
        setLoading(false)
    }
  },[certificates])

  useEffect(()=>{
    if (responseStatus === 'success' && responseMessage === 'Certificate updated successfully') {
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
                                    id="studentName"
                                    name="studentName"
                                    className="form-control"
                                    placeholder="studentName"
                                    value={studentName}
                                    onChange={(e) => setStudentName(e.target.value)}
                                    required="required"
                                />
                                <label htmlFor="studentName" className="inputLabel">
                                    Student Name
                                </label>
                            </div>
                        </div>
                    </div>
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
                                <label htmlFor="name" className="inputLabel">
                                    Course Name
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-12">
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    id="courseDuration"
                                    name="courseDuration"
                                    className="form-control"
                                    placeholder="Course Duration"
                                    value={courseDuration}
                                    onChange={(e) => setCourseDuration(e.target.value)}
                                    required="required"
                                />
                                <label htmlFor="name" className="inputLabel">
                                    Course Duration
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-12">
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    id="certificateLink"
                                    name="certificateLink"
                                    className="form-control"
                                    placeholder="Course Link"
                                    value={certificateLink}
                                    onChange={(e) => setCertificateLink(e.target.value)}
                                    required="required"
                                />
                                <label htmlFor="name" className="inputLabel">
                                    Certificate Link
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
                                htmlFor="certificateImage"
                                className="text-nowrap mt-4 inputLabel"
                            >
                                Certificate Image:
                            </label>
                            <input
                                type="file"
                                id="certificateImage"
                                name="certificateImage"
                                className="mt-4"
                                onChange={(e) => setCertificateImage(e.target.files[0])}
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="row">
                        <div className="col-md-12">
                            <img
                                src={showCurrentImage}
                                style={{ height: "200px" }}
                                className="w-100"
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

export default CertificateEditForm;
