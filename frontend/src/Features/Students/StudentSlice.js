/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_URL_ENDPOINT

const initialState = {
  students: [],
  responseStatus: "",
  responseMessage: "",
};

export const createStudent = createAsyncThunk(
  "students/createStudent",
  async (student, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/addStudent`, student);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getStudents = createAsyncThunk("students/getStudents", async () => {
  try {
    const response = await axios.get(`${baseURL}/getAllStudents`);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
});

export const getStudent = createAsyncThunk(
    "students/getStudent", async (studentId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseURL}/getStudent/${studentId}`);
        return response.data;
    } catch (error) {
        return error.response.data.message;
    }
});

export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async (student, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${baseURL}/updateStudent/${student._id}`, {
          studentName: student.studentName,
          courseId: student.courseId,
          email: student.email,
          mobileNumber: student.mobileNumber,
          address: student.address,
          gender: student.gender,
          college: student.college,
          branch: student.branch,
          qualification: student.qualification,
          semester: student.semester,
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
  }
);

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (studentId, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseURL}/deleteStudent/${studentId}`);
      return studentId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: {
    // store starts
    [createStudent.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [createStudent.fulfilled]: (state, action) => {
      return {
        ...state,
        responseStatus: "success",
        responseMessage: "Student created successfully",
      };
    },
    [createStudent.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // store ends

    // fetching all starts
    [getStudents.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [getStudents.fulfilled]: (state, action) => {
      return {
        ...state,
        students: action.payload,
        responseStatus: "success",
      };
    },
    [getStudents.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // fetching all ends

    // fetching single starts
    [getStudent.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [getStudent.fulfilled]: (state, action) => {
      return {
        ...state,
        students: action.payload,
        responseStatus: "success",
      };
    },
    [getStudent.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // fetching single ends

    // deleting starts
    [deleteStudent.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [deleteStudent.fulfilled]: (state, action) => {
      return {
        ...state,
        responseStatus: "success",
        responseMessage: "Student deleted successfully",
      };
    },
    [deleteStudent.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // deleting ends

    // updating starts
    [updateStudent.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [updateStudent.fulfilled]: (state, action) => {
      if (Array.isArray(state.students)) {
        return {
          ...state,
          students: state.students.map((student) =>
            student.id === action.payload._id ? action.payload : student
          ),
          responseStatus: "success",
          responseMessage: "Student updated successfully",
        };
      } else {
        return {
          ...state,
          students: action.payload,
          responseStatus: "success",
          responseMessage: "Student updated successfully",
        };
      }
    },
    [updateStudent.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // updating ends
  },
});

export default studentsSlice.reducer;
