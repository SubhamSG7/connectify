import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleValidation } from "../Handlers/validationHandler";
import axios from "axios";

const url = import.meta.env.VITE_BackendURL;

export const sendLoginCredetials = createAsyncThunk(
  "login/sendlogindata",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/api/login`, data, {
        withCredentials: true,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const LoginSlice = createSlice({
  name: "loginSlice",
  initialState: {
    loginCredentials: {},
    loading: false,
    validationError: {},
    backendResponse: "",
    error: null,
  },
  reducers: {
    setLoginCredentials: (state, action) => {
      state.loginCredentials[action.payload.name] = action.payload.value;
    },
    validate: (state, action) => {
      const name = action.payload;
      const incomingError = handleValidation(
        name,
        state.loginCredentials[name]
      );
      if (incomingError) {
        state.validationError = { ...state.validationError, ...incomingError };
      } else {
        delete state.validationError[name];
      }
    },
    clearInfo: (state, action) => {
      (state.validationError = {}),
        (state.loginCredentials = {}),
        (state.loading = false),
        (state.error = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendLoginCredetials.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(sendLoginCredetials.fulfilled, (state, action) => {
        state.backendResponse = action.payload;
        clearInfo();
      })
      .addCase(sendLoginCredetials.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});
export const { setLoginCredentials, validate, clearInfo } = LoginSlice.actions;
export default LoginSlice.reducer;
