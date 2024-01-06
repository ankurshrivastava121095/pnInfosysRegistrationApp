import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_URL_ENDPOINT;

const initialState = {
  counts: {},
  responseStatus: "",
  responseMessage: "",
};

export const getCounts = createAsyncThunk("counts/getCounts", async () => {
  try {
    const response = await axios.get(`${baseURL}/count`);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
});

const countsSlice = createSlice({
  name: "counts",
  initialState,
  reducers: {
    resetCountState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCounts.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(getCounts.fulfilled, (state, action) => {
        state.counts = action.payload;
        state.responseStatus = "success";
      })
      .addCase(getCounts.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      });
  },
});

export const { resetCountState } = countsSlice.actions;
export default countsSlice.reducer;