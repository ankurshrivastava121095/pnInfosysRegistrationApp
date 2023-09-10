/* eslint-disable no-unused-vars */
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
      return error.response.data.message;
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
  reducers: {},
  extraReducers: {
    // store starts
    [createInterviewQuestionCourse.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [createInterviewQuestionCourse.fulfilled]: (state, action) => {
      return {
        ...state,
        responseStatus: "success",
        responseMessage: "Course created successfully",
      };
    },
    [createInterviewQuestionCourse.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // store ends

    // fetching all starts
    [getAllInterviewQuestionCourses.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [getAllInterviewQuestionCourses.fulfilled]: (state, action) => {
      return {
        ...state,
        interviewQuestionCourses: action.payload,
        responseStatus: "success",
      };
    },
    [getAllInterviewQuestionCourses.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // fetching all ends

    // fetching single starts
    [getInterviewQuestionCourse.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [getInterviewQuestionCourse.fulfilled]: (state, action) => {
      return {
        ...state,
        interviewQuestionCourses: action.payload,
        responseStatus: "success",
      };
    },
    [getInterviewQuestionCourse.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // fetching single ends

    // deleting starts
    [deleteInterviewQuestionCourse.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [deleteInterviewQuestionCourse.fulfilled]: (state, action) => {
      return {
        ...state,
        responseStatus: "success",
        responseMessage: "Course deleted successfully",
      };
    },
    [deleteInterviewQuestionCourse.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // deleting ends

    // updating starts
    [updateInterviewQuestionCourse.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [updateInterviewQuestionCourse.fulfilled]: (state, action) => {
      if (Array.isArray(state.interviewQuestionCourses)) {
        return {
          ...state,
          interviewQuestionCourses: state.interviewQuestionCourses.map((interviewQuestionCourse) =>
            interviewQuestionCourse.id === action.payload._id ? action.payload : interviewQuestionCourse
          ),
          responseStatus: "success",
          responseMessage: "Course updated successfully",
        };
      } else {
        return {
          ...state,
          interviewQuestionCourses: action.payload,
          responseStatus: "success",
          responseMessage: "Course updated successfully",
        };
      }
    },
    [updateInterviewQuestionCourse.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // updating ends
  },
});

export default interviewQuestionCoursesSlice.reducer;
