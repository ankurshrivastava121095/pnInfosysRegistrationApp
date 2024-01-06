import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_URL_ENDPOINT;

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
        return rejectWithValue(error.response.data.message);
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
  extraReducers: (builder) => {
    builder
      .addCase(createCertificate.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(createCertificate.fulfilled, (state) => {
        state.responseStatus = "success";
        state.responseMessage = "Certificate created successfully";
      })
      .addCase(createCertificate.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(getCertificates.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(getCertificates.fulfilled, (state, action) => {
        state.certificates = action.payload;
        state.responseStatus = "success";
      })
      .addCase(getCertificates.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(getCertificate.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(getCertificate.fulfilled, (state, action) => {
        state.certificates = action.payload;
        state.responseStatus = "success";
      })
      .addCase(getCertificate.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(deleteCertificate.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(deleteCertificate.fulfilled, (state) => {
        state.responseStatus = "success";
        state.responseMessage = "Certificate deleted successfully";
      })
      .addCase(deleteCertificate.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(updateCertificate.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(updateCertificate.fulfilled, (state, action) => {
        if (Array.isArray(state.certificates)) {
          state.certificates = state.certificates.map((certificate) =>
            certificate.id === action.payload._id ? action.payload : certificate
          );
        } else {
          state.certificates = action.payload;
        }
        state.responseStatus = "success";
        state.responseMessage = "Certificate updated successfully";
      })
      .addCase(updateCertificate.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      });
  },
});

export default certificatesSlice.reducer;