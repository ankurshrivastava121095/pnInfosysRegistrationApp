import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_URL_ENDPOINT;

const initialState = {
  interviewQuestionCourses: [],
  responseStatus: "",
  responseMessage: "",
};

export const createInterviewQuestionCourse = createAsyncThunk(
  "interviewQuestionCourses/createInterviewQuestionCourse",
  async (interviewQuestionCourse, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/addInterviewQuestionCourse`, interviewQuestionCourse);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllInterviewQuestionCourses = createAsyncThunk("interviewQuestionCourses/getAllInterviewQuestionCourses", async () => {
  try {
    const response = await axios.get(`${baseURL}/getInterviewQuestionCourses`);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
});

export const getInterviewQuestionCourse = createAsyncThunk(
  "interviewQuestionCourses/getInterviewQuestionCourse", async (interviewQuestionCourseId, { rejectWithValue }) => {
  try {
      const response = await axios.get(`${baseURL}/getInterviewQuestionCourse/${interviewQuestionCourseId}`);
      return response.data;
  } catch (error) {
      return rejectWithValue(error.response.data.message);
  }
});

export const updateInterviewQuestionCourse = createAsyncThunk(
  "interviewQuestionCourses/updateInterviewQuestionCourse",
  async (interviewQuestionCourse, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseURL}/updateInterviewQuestionCourse/${interviewQuestionCourse._id}`,
        interviewQuestionCourse
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteInterviewQuestionCourse = createAsyncThunk(
  "interviewQuestionCourses/deleteInterviewQuestionCourse",
  async (interviewQuestionCourseId, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseURL}/interviewQuestionCourseDelete/${interviewQuestionCourseId}`);
      return interviewQuestionCourseId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const interviewQuestionCoursesSlice = createSlice({
  name: "interviewQuestionCourses",
  initialState,
  reducers: {
    resetInterviewQuestionCourseState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInterviewQuestionCourse.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(createInterviewQuestionCourse.fulfilled, (state, action) => {
        state.responseStatus = "success";
        state.responseMessage = "Course created successfully";
      })
      .addCase(createInterviewQuestionCourse.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(getAllInterviewQuestionCourses.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(getAllInterviewQuestionCourses.fulfilled, (state, action) => {
        state.interviewQuestionCourses = action.payload;
        state.responseStatus = "success";
      })
      .addCase(getAllInterviewQuestionCourses.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(getInterviewQuestionCourse.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(getInterviewQuestionCourse.fulfilled, (state, action) => {
        state.interviewQuestionCourses = action.payload;
        state.responseStatus = "success";
      })
      .addCase(getInterviewQuestionCourse.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(deleteInterviewQuestionCourse.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(deleteInterviewQuestionCourse.fulfilled, (state, action) => {
        state.responseStatus = "success";
        state.responseMessage = "Course deleted successfully";
      })
      .addCase(deleteInterviewQuestionCourse.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(updateInterviewQuestionCourse.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(updateInterviewQuestionCourse.fulfilled, (state, action) => {
        if (Array.isArray(state.interviewQuestionCourses)) {
          state.interviewQuestionCourses = state.interviewQuestionCourses.map((interviewQuestionCourse) =>
            interviewQuestionCourse.id === action.payload._id ? action.payload : interviewQuestionCourse
          );
        } else {
          state.interviewQuestionCourses = action.payload;
        }
        state.responseStatus = "success";
        state.responseMessage = "Course updated successfully";
      })
      .addCase(updateInterviewQuestionCourse.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      });
  },
});

export const { resetInterviewQuestionCourseState } = interviewQuestionCoursesSlice.actions;
export default interviewQuestionCoursesSlice.reducer;