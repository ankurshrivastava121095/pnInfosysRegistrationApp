/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_URL_ENDPOINT

const initialState = {
  banners: [],
  responseStatus: "",
  responseMessage: "",
};

export const createBanner = createAsyncThunk(
  "banners/createBanner",
  async (banner, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/addBanner`, banner);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getBanners = createAsyncThunk("banners/getBanners", async () => {
  try {
    const response = await axios.get(`${baseURL}/getAllBanner`);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
});

export const getBanner = createAsyncThunk(
    "banners/getBanner", async (bannerId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseURL}/bannerDetail/${bannerId}`);
        return response.data;
    } catch (error) {
        return error.response.data.message;
    }
});

export const updateBanner = createAsyncThunk(
  "banners/updateBanner",
  async (banner, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('title', banner.title);
      formData.append('bannerStatus', banner.bannerStatus);
      formData.append('bannerImage', banner.bannerImage);

      const response = await axios.put(`${baseURL}/updateBanner/${banner._id}`, formData, {
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

export const deleteBanner = createAsyncThunk(
  "banners/deleteBanner",
  async (bannerId, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseURL}/bannerDelete/${bannerId}`);
      return bannerId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const bannersSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {},
  extraReducers: {
    // store starts
    [createBanner.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [createBanner.fulfilled]: (state, action) => {
      return {
        ...state,
        responseStatus: "success",
        responseMessage: "Banner created successfully",
      };
    },
    [createBanner.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // store ends

    // fetching all starts
    [getBanners.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [getBanners.fulfilled]: (state, action) => {
      return {
        ...state,
        banners: action.payload,
        responseStatus: "success",
      };
    },
    [getBanners.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // fetching all ends

    // fetching single starts
    [getBanner.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [getBanner.fulfilled]: (state, action) => {
      return {
        ...state,
        banners: action.payload,
        responseStatus: "success",
      };
    },
    [getBanner.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // fetching single ends

    // deleting starts
    [deleteBanner.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [deleteBanner.fulfilled]: (state, action) => {
      return {
        ...state,
        responseStatus: "success",
        responseMessage: "Banner deleted successfully",
      };
    },
    [deleteBanner.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // deleting ends

    // updating starts
    [updateBanner.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [updateBanner.fulfilled]: (state, action) => {
      if (Array.isArray(state.banners)) {
        return {
          ...state,
          banners: state.banners.map((banner) =>
            banner.id === action.payload._id ? action.payload : banner
          ),
          responseStatus: "success",
          responseMessage: "Banner updated successfully",
        };
      } else {
        return {
          ...state,
          banners: action.payload,
          responseStatus: "success",
          responseMessage: "Banner updated successfully",
        };
      }
    },
    [updateBanner.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // updating ends
  },
});

export default bannersSlice.reducer;
