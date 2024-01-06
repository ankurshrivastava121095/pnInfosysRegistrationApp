import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_URL_ENDPOINT;

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
      return rejectWithValue(error.response.data.message);
    }
  }
);

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
  reducers: {
    resetCourseState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCourse.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(createCourse.fulfilled, (state) => {
        state.responseStatus = "success";
        state.responseMessage = "Course created successfully";
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(getCourses.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.responseStatus = "success";
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(getCourse.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(getCourse.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.responseStatus = "success";
      })
      .addCase(getCourse.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(deleteCourse.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(deleteCourse.fulfilled, (state) => {
        state.responseStatus = "success";
        state.responseMessage = "Course deleted successfully";
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(updateCourse.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        if (Array.isArray(state.courses)) {
          state.courses = state.courses.map((course) =>
            course.id === action.payload._id ? action.payload : course
          );
        } else {
          state.courses = action.payload;
        }
        state.responseStatus = "success";
        state.responseMessage = "Course updated successfully";
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      });
  },
});

export const { resetCourseState } = coursesSlice.actions;
export default coursesSlice.reducer;