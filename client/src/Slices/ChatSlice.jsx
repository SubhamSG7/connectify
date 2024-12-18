import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const wsUrl = import.meta.env.VITE_SocketURL;
const url = import.meta.env.VITE_BackendURL;
let ws = null;

const ChatSlice = createSlice({
  name: "chatSlice",
  initialState: {
    userMessage: "",
    connected: false,
    responseMessage: [],
    error: "",
  },
  reducers: {
    setUserMessage: (state, action) => {
      state.userMessage = action.payload;
    },
    setConnected: (state, action) => {
      state.connected = action.payload;
    },
    addResponseMessage: (state, action) => {
      state.responseMessage.push(action.payload);
    },
    setWsError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUserMessage, setConnected, addResponseMessage, setWsError } =
  ChatSlice.actions;

// Middleware-like WebSocket actions
export const connectWebSocket = () => async (dispatch) => {
  let token = null;
  try {
    const resp = await axios.post(
      `${url}/api/ws/handshake`,
      {},
      { withCredentials: true }
    );
    token = resp?.data;
    if (!token) throw new Error("Failed to retrieve token");
    sessionStorage.setItem("authToken", token.token);
  } catch (error) {
    dispatch(setWsError("WebSocket connection failed: " + error.message));
    return;
  }

  if (!ws || ws.readyState !== WebSocket.OPEN) {
    ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("WebSocket connected");
      dispatch(setConnected(true));
    };

    ws.onmessage = (event) => {
      try {
        const data = event.data;
        if (data === "error") dispatch(setWsError("Unable to send message"));
        dispatch(addResponseMessage(data));
      } catch (error) {
        dispatch(setWsError("Error parsing server response"));
      }
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      sessionStorage.removeItem("authToken");
      dispatch(setConnected(false));
      ws = null;
    };

    ws.onerror = (error) => {
      dispatch(setWsError("WebSocket encountered an error"));
    };
  }
};

export const sendMessage = (message) => () => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      setWsError("Your session has expired. Please log in.");
    }
    const dataToSend = JSON.stringify({ message, token });
    console.log(token);
    ws.send(dataToSend);
  } else {
    setWsError("socket is closed");
  }
};

export const disconnectWebSocket = () => () => {
  if (ws) {
    ws.close();
    ws = null;
  }
};

export default ChatSlice.reducer;
