import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_URL_ENDPOINT;

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
        return rejectWithValue(error.response.data.message);
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
  name: "sliders",
  initialState,
  reducers: {
    resetSliderState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSlider.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(createSlider.fulfilled, (state, action) => {
        state.responseStatus = "success";
        state.responseMessage = "Slider created successfully";
      })
      .addCase(createSlider.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(getSliders.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(getSliders.fulfilled, (state, action) => {
        state.sliders = action.payload;
        state.responseStatus = "success";
      })
      .addCase(getSliders.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(getSlider.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(getSlider.fulfilled, (state, action) => {
        state.sliders = action.payload;
        state.responseStatus = "success";
      })
      .addCase(getSlider.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(deleteSlider.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(deleteSlider.fulfilled, (state, action) => {
        state.responseStatus = "success";
        state.responseMessage = "Slider deleted successfully";
      })
      .addCase(deleteSlider.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(updateSlider.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(updateSlider.fulfilled, (state, action) => {
        if (Array.isArray(state.sliders)) {
          state.sliders = state.sliders.map((slider) =>
            slider.id === action.payload._id ? action.payload : slider
          );
        } else {
          state.sliders = action.payload;
        }
        state.responseStatus = "success";
        state.responseMessage = "Slider updated successfully";
      })
      .addCase(updateSlider.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      });
  },
});

export const { resetSliderState } = slidersSlice.actions;
export default slidersSlice.reducer;