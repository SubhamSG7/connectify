import { createSlice } from "@reduxjs/toolkit";

const OtpSlice = createSlice({
  name: "otpslice",
  initialState: {
    backendResponse: "",
    loading: false,
  },
  reducers: {
    setBackendResponse: (state, action) => {
      state.backendResponse = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearAll: (state, action) => {
      state.backendResponse = "";
      state.loading = false;
    },
  },
});

export const { setBackendResponse, setLoading, clearAll } = OtpSlice.actions;
export default OtpSlice.reducer;
