/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_URL_ENDPOINT

const initialState = {
  contacts: [],
  responseStatus: "",
  responseMessage: "",
};

export const createContact = createAsyncThunk(
  "contacts/createContact",
  async (contact, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/addMessage`, contact);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getContacts = createAsyncThunk("contacts/getContacts", async () => {
  try {
    const response = await axios.get(`${baseURL}/getAllMessages`);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
});

export const getContact = createAsyncThunk(
    "contacts/getContact", async (contactId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseURL}/messageDetail/${contactId}`);
        return response.data;
    } catch (error) {
        return error.response.data.message;
    }
});

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: {
    // store starts
    [createContact.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [createContact.fulfilled]: (state, action) => {
      return {
        ...state,
        responseStatus: "success",
        responseMessage: "Contact created successfully",
      };
    },
    [createContact.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // store ends

    // fetching all starts
    [getContacts.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [getContacts.fulfilled]: (state, action) => {
      return {
        ...state,
        contacts: action.payload,
        responseStatus: "success",
      };
    },
    [getContacts.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // fetching all ends

    // fetching single starts
    [getContact.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [getContact.fulfilled]: (state, action) => {
      return {
        ...state,
        contacts: action.payload,
        responseStatus: "success",
      };
    },
    [getContact.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    // fetching single ends
  },
});

export default contactsSlice.reducer;
