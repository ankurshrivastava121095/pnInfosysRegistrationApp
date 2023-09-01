/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_URL_ENDPOINT

const initialState = {
  sliders: [],
  responseStatus: "",
  responseMessage: "",
};

export const createSlider = createAsyncThunk(
  "sliders/createSlider",
  async (slider, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/addSlider`, slider);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getSliders = createAsyncThunk("sliders/getSliders", async () => {
  try {
    const response = await axios.get(`${baseURL}/getAllSlider`);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
});

export const getSlider = createAsyncThunk(
    "sliders/getSlider", async (sliderId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseURL}/sliderDetail/${sliderId}`);
        return response.data;
    } catch (error) {
        return error.response.data.message;
    }
});

export const updateSlider = createAsyncThunk(
  "sliders/updateSlider",
  async (slider, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('title', slider.title);
      formData.append('sliderStatus', slider.sliderStatus);
      formData.append('sliderImage', slider.sliderImage);

      const response = await axios.put(`${baseURL}/updateSlider/${slider._id}`, formData, {
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

export const deleteSlider = createAsyncThunk(
  "sliders/deleteSlider",
  async (sliderId, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseURL}/sliderDelete/${sliderId}`);
      return sliderId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const slidersSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {},
  extraReducers: {
    // store starts
    [createSlider.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [createSlider.fulfilled]: (state, action) => {
      return {
        ...state,
        responseStatus: "success",
        responseMessage: "Slider created successfully",
      };
    },
    [createSlider.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // store ends

    // fetching all starts
    [getSliders.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [getSliders.fulfilled]: (state, action) => {
      return {
        ...state,
        sliders: action.payload,
        responseStatus: "success",
      };
    },
    [getSliders.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // fetching all ends

    // fetching single starts
    [getSlider.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [getSlider.fulfilled]: (state, action) => {
      return {
        ...state,
        sliders: action.payload,
        responseStatus: "success",
      };
    },
    [getSlider.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // fetching single ends

    // deleting starts
    [deleteSlider.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [deleteSlider.fulfilled]: (state, action) => {
      return {
        ...state,
        responseStatus: "success",
        responseMessage: "Slider deleted successfully",
      };
    },
    [deleteSlider.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // deleting ends

    // updating starts
    [updateSlider.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [updateSlider.fulfilled]: (state, action) => {
      if (Array.isArray(state.sliders)) {
        return {
          ...state,
          sliders: state.sliders.map((slider) =>
            slider.id === action.payload._id ? action.payload : slider
          ),
          responseStatus: "success",
          responseMessage: "Slider updated successfully",
        };
      } else {
        return {
          ...state,
          sliders: action.payload,
          responseStatus: "success",
          responseMessage: "Slider updated successfully",
        };
      }
    },
    [updateSlider.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // updating ends
  },
});

export default slidersSlice.reducer;
