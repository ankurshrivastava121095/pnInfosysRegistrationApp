/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_URL_ENDPOINT

const initialState = {
  placements: [],
  responseStatus: "",
  responseMessage: "",
};

export const createPlacement = createAsyncThunk(
  "placements/createPlacement",
  async (placement, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/addPlacedStudent`, placement);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getPlacements = createAsyncThunk("placements/getPlacements", async () => {
  try {
    const response = await axios.get(`${baseURL}/getAllPlacedStudents`);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
});

export const getPlacement = createAsyncThunk(
    "placements/getPlacement", async (placementId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseURL}/placedStudentsDetail/${placementId}`);
        return response.data;
    } catch (error) {
        return error.response.data.message;
    }
});

export const updatePlacement = createAsyncThunk(
  "placements/updatePlacement",
  async (placement, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', placement.name);
      formData.append('company', placement.company);
      formData.append('designation', placement.designation);
      formData.append('placedStudentImage', placement.placedStudentImage);

      const response = await axios.put(`${baseURL}/updatePlacedStudent/${placement._id}`, formData, {
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

export const deletePlacement = createAsyncThunk(
  "placements/deletePlacement",
  async (placementId, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseURL}/placedStudentDelete/${placementId}`);
      return placementId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const placementsSlice = createSlice({
  name: "placements",
  initialState,
  reducers: {},
  extraReducers: {
    // store starts
    [createPlacement.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [createPlacement.fulfilled]: (state, action) => {
      return {
        ...state,
        responseStatus: "success",
        responseMessage: "Placed Student created successfully",
      };
    },
    [createPlacement.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // store ends

    // fetching all starts
    [getPlacements.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [getPlacements.fulfilled]: (state, action) => {
      return {
        ...state,
        placements: action.payload,
        responseStatus: "success",
      };
    },
    [getPlacements.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // fetching all ends

    // fetching single starts
    [getPlacement.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [getPlacement.fulfilled]: (state, action) => {
      return {
        ...state,
        placements: action.payload,
        responseStatus: "success",
      };
    },
    [getPlacement.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // fetching single ends

    // deleting starts
    [deletePlacement.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [deletePlacement.fulfilled]: (state, action) => {
      return {
        ...state,
        responseStatus: "success",
        responseMessage: "Placed Student deleted successfully",
      };
    },
    [deletePlacement.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // deleting ends

    // updating starts
    [updatePlacement.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [updatePlacement.fulfilled]: (state, action) => {
      if (Array.isArray(state.placements)) {
        return {
          ...state,
          placements: state.placements.map((placement) =>
            placement.id === action.payload._id ? action.payload : placement
          ),
          responseStatus: "success",
          responseMessage: "Placed Student updated successfully",
        };
      } else {
        return {
          ...state,
          placements: action.payload,
          responseStatus: "success",
          responseMessage: "Placed Student updated successfully",
        };
      }
    },
    [updatePlacement.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // updating ends
  },
});

export default placementsSlice.reducer;
