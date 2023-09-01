/* eslint-disable no-unused-vars */
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
      return error.response.data.message;
    }
  }
);

export const getQuestion = createAsyncThunk(
  "questions/getQuestion", async (questionId, { rejectWithValue }) => {
  try {
      const response = await axios.get(`${baseURL}/getQuestion/${questionId}`);
      return response.data;
  } catch (error) {
      return error.response.data.message;
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
  reducers: {},
  extraReducers: {
    // store starts
    [createQuestion.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [createQuestion.fulfilled]: (state, action) => {
      return {
        ...state,
        responseStatus: "success",
        responseMessage: "Question created successfully",
      };
    },
    [createQuestion.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // store ends

    // fetching all starts
    [getAllQuestions.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [getAllQuestions.fulfilled]: (state, action) => {
      return {
        ...state,
        questions: action.payload,
        responseStatus: "success",
      };
    },
    [getAllQuestions.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // fetching all ends

    // fetching all by course id starts
    [getQuestions.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [getQuestions.fulfilled]: (state, action) => {
      return {
        ...state,
        questions: action.payload,
        responseStatus: "success",
      };
    },
    [getQuestions.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // fetching all by course id ends

    // fetching single starts
    [getQuestion.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [getQuestion.fulfilled]: (state, action) => {
      return {
        ...state,
        questions: action.payload,
        responseStatus: "success",
      };
    },
    [getQuestion.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // fetching single ends

    // deleting starts
    [deleteQuestion.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [deleteQuestion.fulfilled]: (state, action) => {
      return {
        ...state,
        responseStatus: "success",
        responseMessage: "Question deleted successfully",
      };
    },
    [deleteQuestion.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // deleting ends

    // updating starts
    [updateQuestion.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [updateQuestion.fulfilled]: (state, action) => {
      if (Array.isArray(state.questions)) {
        return {
          ...state,
          questions: state.questions.map((question) =>
            question.id === action.payload._id ? action.payload : question
          ),
          responseStatus: "success",
          responseMessage: "Question updated successfully",
        };
      } else {
        return {
          ...state,
          questions: action.payload,
          responseStatus: "success",
          responseMessage: "Question updated successfully",
        };
      }
    },
    [updateQuestion.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // updating ends
  },
});

export default questionsSlice.reducer;
