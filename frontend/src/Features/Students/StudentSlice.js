import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_URL_ENDPOINT;

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
        return rejectWithValue(error.response.data.message);
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
  reducers: {
    resetStudentState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStudent.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.responseStatus = "success";
        state.responseMessage = "You have Registered Successfully, We will get in touch with you soon!";
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(getStudents.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.students = action.payload;
        state.responseStatus = "success";
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(getStudent.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(getStudent.fulfilled, (state, action) => {
        state.students = action.payload;
        state.responseStatus = "success";
      })
      .addCase(getStudent.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(deleteStudent.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.responseStatus = "success";
        state.responseMessage = "Student deleted successfully";
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(updateStudent.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        if (Array.isArray(state.students)) {
          state.students = state.students.map((student) =>
            student.id === action.payload._id ? action.payload : student
          );
        } else {
          state.students = action.payload;
        }
        state.responseStatus = "success";
        state.responseMessage = "Student updated successfully";
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      });
  },
});

export const { resetStudentState } = studentsSlice.actions;
export default studentsSlice.reducer;