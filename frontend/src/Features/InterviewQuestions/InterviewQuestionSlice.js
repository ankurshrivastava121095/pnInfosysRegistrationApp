import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_URL_ENDPOINT;

const initialState = {
  questions: [],
  responseStatus: "",
  responseMessage: "",
};

export const createQuestion = createAsyncThunk(
  "questions/createQuestion",
  async (question, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/addQuestion`, question);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllQuestions = createAsyncThunk("questions/getAllQuestions", async () => {
  try {
    const response = await axios.get(`${baseURL}/getAllQuestions`);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
});

export const getQuestions = createAsyncThunk(
  "questions/getQuestions",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseURL}/getQuestions/${courseId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getQuestion = createAsyncThunk(
  "questions/getQuestion", async (questionId, { rejectWithValue }) => {
  try {
      const response = await axios.get(`${baseURL}/getQuestion/${questionId}`);
      return response.data;
  } catch (error) {
      return rejectWithValue(error.response.data.message);
  }
});

export const updateQuestion = createAsyncThunk(
  "questions/updateQuestion",
  async (question, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseURL}/updateQuestion/${question._id}`,
        question
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteQuestion = createAsyncThunk(
  "questions/deleteQuestion",
  async (questionId, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseURL}/questionDelete/${questionId}`);
      return questionId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    resetQuestionState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createQuestion.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.responseStatus = "success";
        state.responseMessage = "Question created successfully";
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(getAllQuestions.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(getAllQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.responseStatus = "success";
      })
      .addCase(getAllQuestions.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(getQuestions.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.responseStatus = "success";
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(getQuestion.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(getQuestion.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.responseStatus = "success";
      })
      .addCase(getQuestion.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(deleteQuestion.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.responseStatus = "success";
        state.responseMessage = "Question deleted successfully";
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(updateQuestion.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        if (Array.isArray(state.questions)) {
          state.questions = state.questions.map((question) =>
            question.id === action.payload._id ? action.payload : question
          );
        } else {
          state.questions = action.payload;
        }
        state.responseStatus = "success";
        state.responseMessage = "Question updated successfully";
      })
      .addCase(updateQuestion.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      });
  },
});

export const { resetQuestionState } = questionsSlice.actions;
export default questionsSlice.reducer;