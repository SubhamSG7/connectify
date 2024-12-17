import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_BackendURL;
const sendGlobalChat = createAsyncThunk(
  "sendChat/sendGlobalChat",
  async (data, { rejectWithValue }) => {
    try {
      const resp = await axios.post(`${url}/api/chat/global`, data, {
        withCredentials: true,
      });
      return resp?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const ChatSlice = createSlice({
  name: "chatSlice",
  initialState: {
    userMessage: "",
  },
  reducers: {
    setUserMessage: (state, action) => {
      state.userMessage = action.payload;
    },
  },
});

export const { setUserMessage } = ChatSlice.actions;
export default ChatSlice.reducer;
