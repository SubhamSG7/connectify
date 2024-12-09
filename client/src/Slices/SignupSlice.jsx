import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleValidation } from "../Handlers/validationHandler";
import axios from "axios";

const url = import.meta.env.VITE_BackendURL;

export const sendSignupData = createAsyncThunk(
  "signup/sendsignupdata",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/api/signup`, data, {
        withCredentials: true,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const SignupSlice = createSlice({
  name: "SignupSlice",
  initialState: {
    userInfo: {},
    error: null,
    validationError: {},
    loading: false,
    backendResponse: "",
  },
  reducers: {
    addInfo: (state, action) => {
      state.userInfo[action.payload.name] = action.payload.value;
    },
    clearInfo: (state, action) => {
      state.error = null;
      state.validationError = {};
      state.loading = false;
      state.userInfo = {};
    },
    checkValidation: (state, action) => {
      const incomingType = action.payload.type;
      const value = state.userInfo[action.payload.type];
      let incomingError = handleValidation(incomingType, value);
      if (incomingError)
        state.validationError = { ...state.validationError, ...incomingError };
      else delete state.validationError[incomingType];
    },
    clearError: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendSignupData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(sendSignupData.fulfilled, (state, action) => {
        state.backendResponse = action.payload;
        clearInfo();
      })
      .addCase(sendSignupData.rejected, (state, action) => {
        console.log(action.payload);
        state.error = action.payload;
      });
  },
});
export const { addInfo, clearInfo, checkValidation, clearError } =
  SignupSlice.actions;
export default SignupSlice.reducer;
