/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_URL_ENDPOINT

const initialState = {
  courses: [],
  responseStatus: "",
  responseMessage: "",
};

export const createCourse = createAsyncThunk(
  "courses/createCourse",
  async (course, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/addCourse`, course);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getCourses = createAsyncThunk("courses/getCourses", async () => {
  try {
    const response = await axios.get(`${baseURL}/getAllCourses`);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
});

export const getCourse = createAsyncThunk(
    "courses/getCourse", async (courseId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseURL}/courseDetail/${courseId}`);
        return response.data;
    } catch (error) {
        return error.response.data.message;
    }
});

export const updateCourse = createAsyncThunk(
  "courses/updateCourse",
  async (course, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('courseName', course.courseName);
      formData.append('databaseName', course.databaseName);
      formData.append('languageOne', course.languageOne);
      formData.append('languageTwo', course.languageTwo);
      formData.append('languageThree', course.languageThree);
      formData.append('languageFour', course.languageFour);
      formData.append('duration', course.duration);
      formData.append('fees', course.fees);
      formData.append('description', course.description);
      formData.append('databaseIcon', course.databaseIcon);
      formData.append('databaseIconColor', course.databaseIconColor);
      formData.append('languageOneIcon', course.languageOneIcon);
      formData.append('languageOneIconColor', course.languageOneIconColor);
      formData.append('languageTwoIcon', course.languageTwoIcon);
      formData.append('languageTwoIconColor', course.languageTwoIconColor);
      formData.append('languageThreeIcon', course.languageThreeIcon);
      formData.append('languageThreeIconColor', course.languageThreeIconColor);
      formData.append('languageFourIcon', course.languageFourIcon);
      formData.append('languageFourIconColor', course.languageFourIconColor);
      formData.append('courseImage', course.courseImage);

      const response = await axios.put(`${baseURL}/updateCourse/${course._id}`, formData, {
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

export const deleteCourse = createAsyncThunk(
  "courses/deleteCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseURL}/courseDelete/${courseId}`);
      return courseId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: {
    // store starts
    [createCourse.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [createCourse.fulfilled]: (state, action) => {
      return {
        ...state,
        responseStatus: "success",
        responseMessage: "Course created successfully",
      };
    },
    [createCourse.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // store ends

    // fetching all starts
    [getCourses.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [getCourses.fulfilled]: (state, action) => {
      return {
        ...state,
        courses: action.payload,
        responseStatus: "success",
      };
    },
    [getCourses.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // fetching all ends

    // fetching single starts
    [getCourse.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [getCourse.fulfilled]: (state, action) => {
      return {
        ...state,
        courses: action.payload,
        responseStatus: "success",
      };
    },
    [getCourse.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // fetching single ends

    // deleting starts
    [deleteCourse.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [deleteCourse.fulfilled]: (state, action) => {
      return {
        ...state,
        responseStatus: "success",
        responseMessage: "Course deleted successfully",
      };
    },
    [deleteCourse.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // deleting ends

    // updating starts
    [updateCourse.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [updateCourse.fulfilled]: (state, action) => {
      if (Array.isArray(state.courses)) {
        return {
          ...state,
          courses: state.courses.map((course) =>
            course.id === action.payload._id ? action.payload : course
          ),
          responseStatus: "success",
          responseMessage: "Course updated successfully",
        };
      } else {
        return {
          ...state,
          courses: action.payload,
          responseStatus: "success",
          responseMessage: "Course updated successfully",
        };
      }
    },
    [updateCourse.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // updating ends
  },
});

export default coursesSlice.reducer;
