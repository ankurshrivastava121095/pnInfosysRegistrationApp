/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_URL_ENDPOINT

const initialState = {
  certificates: [],
  responseStatus: "",
  responseMessage: "",
};

export const createCertificate = createAsyncThunk(
  "certificates/createCertificate",
  async (certificate, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/addCertificate`, certificate);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getCertificates = createAsyncThunk("certificates/getCertificates", async () => {
  try {
    const response = await axios.get(`${baseURL}/getAllCertificate`);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
});

export const getCertificate = createAsyncThunk(
    "certificates/getCertificate", async (certificateId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseURL}/certificateDetail/${certificateId}`);
        return response.data;
    } catch (error) {
        return error.response.data.message;
    }
});

export const updateCertificate = createAsyncThunk(
  "certificates/updateCertificate",
  async (certificate, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('studentName', certificate.studentName);
      formData.append('courseName', certificate.courseName);
      formData.append('courseDuration', certificate.courseDuration);
      formData.append('certificateLink', certificate.certificateLink);
      formData.append('certificateImage', certificate.certificateImage);

      const response = await axios.put(`${baseURL}/updateCertificate/${certificate._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteCertificate = createAsyncThunk(
  "certificates/deleteCertificate",
  async (certificateId, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseURL}/certificateDelete/${certificateId}`);
      return certificateId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const certificatesSlice = createSlice({
  name: "certificates",
  initialState,
  reducers: {},
  extraReducers: {
    // store starts
    [createCertificate.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [createCertificate.fulfilled]: (state, action) => {
      return {
        ...state,
        responseStatus: "success",
        responseMessage: "Certificate created successfully",
      };
    },
    [createCertificate.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // store ends

    // fetching all starts
    [getCertificates.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [getCertificates.fulfilled]: (state, action) => {
      return {
        ...state,
        certificates: action.payload,
        responseStatus: "success",
      };
    },
    [getCertificates.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // fetching all ends

    // fetching single starts
    [getCertificate.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [getCertificate.fulfilled]: (state, action) => {
      return {
        ...state,
        certificates: action.payload,
        responseStatus: "success",
      };
    },
    [getCertificate.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // fetching single ends

    // deleting starts
    [deleteCertificate.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [deleteCertificate.fulfilled]: (state, action) => {
      return {
        ...state,
        responseStatus: "success",
        responseMessage: "Certificate deleted successfully",
      };
    },
    [deleteCertificate.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // deleting ends

    // updating starts
    [updateCertificate.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [updateCertificate.fulfilled]: (state, action) => {
      if (Array.isArray(state.certificates)) {
        return {
          ...state,
          certificates: state.certificates.map((certificate) =>
            certificate.id === action.payload._id ? action.payload : certificate
          ),
          responseStatus: "success",
          responseMessage: "Certificate updated successfully",
        };
      } else {
        return {
          ...state,
          certificates: action.payload,
          responseStatus: "success",
          responseMessage: "Certificate updated successfully",
        };
      }
    },
    [updateCertificate.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // updating ends
  },
});

export default certificatesSlice.reducer;
