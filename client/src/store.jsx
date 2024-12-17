import { configureStore } from "@reduxjs/toolkit";
import SignupSlice from "./Slices/SignupSlice";
import loginSlice from "./Slices/LoginSlice";
import otpSlice from "./Slices/OtpSlice";
import profileSlice from "./Slices/ProfileSlice";
import chatSlice from "./Slices/ChatSlice";

export const store = configureStore({
  reducer: { SignupSlice, otpSlice, loginSlice, profileSlice, chatSlice },
});
