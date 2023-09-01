/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_URL_ENDPOINT

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
  reducers: {},
  extraReducers: {
    // fetching all starts
    [getCounts.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [getCounts.fulfilled]: (state, action) => {
      return {
        ...state,
        counts: action.payload,
        responseStatus: "success",
      };
    },
    [getCounts.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // fetching all ends
  },
});

export default countsSlice.reducer;
