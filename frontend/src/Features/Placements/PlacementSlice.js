import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_URL_ENDPOINT;

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
        return rejectWithValue(error.response.data.message);
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
  reducers: {
    resetPlacementState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPlacement.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(createPlacement.fulfilled, (state, action) => {
        state.responseStatus = "success";
        state.responseMessage = "Placed Student created successfully";
      })
      .addCase(createPlacement.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(getPlacements.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(getPlacements.fulfilled, (state, action) => {
        state.placements = action.payload;
        state.responseStatus = "success";
      })
      .addCase(getPlacements.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(getPlacement.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(getPlacement.fulfilled, (state, action) => {
        state.placements = action.payload;
        state.responseStatus = "success";
      })
      .addCase(getPlacement.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(deletePlacement.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(deletePlacement.fulfilled, (state, action) => {
        state.responseStatus = "success";
        state.responseMessage = "Placed Student deleted successfully";
      })
      .addCase(deletePlacement.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(updatePlacement.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(updatePlacement.fulfilled, (state, action) => {
        if (Array.isArray(state.placements)) {
          state.placements = state.placements.map((placement) =>
            placement.id === action.payload._id ? action.payload : placement
          );
        } else {
          state.placements = action.payload;
        }
        state.responseStatus = "success";
        state.responseMessage = "Placed Student updated successfully";
      })
      .addCase(updatePlacement.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      });
  },
});

export const { resetPlacementState } = placementsSlice.actions;
export default placementsSlice.reducer;