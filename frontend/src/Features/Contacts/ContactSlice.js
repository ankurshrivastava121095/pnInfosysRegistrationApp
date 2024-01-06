import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_URL_ENDPOINT;

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
      return rejectWithValue(error.response.data.message);
    }
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    resetContactState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createContact.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(createContact.fulfilled, (state) => {
        state.responseStatus = "success";
        state.responseMessage = "Contact created successfully";
      })
      .addCase(createContact.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(getContacts.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.responseStatus = "success";
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      })
      .addCase(getContact.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(getContact.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.responseStatus = "success";
      })
      .addCase(getContact.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      });
  },
});

export const { resetContactState } = contactsSlice.actions;
export default contactsSlice.reducer;