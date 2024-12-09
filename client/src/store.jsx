import { configureStore } from "@reduxjs/toolkit";
import SignupSlice from "./Slices/SignupSlice";

import otpSlice from "./Slices/OtpSlice";

export const store = configureStore({
  reducer: { SignupSlice, otpSlice },
});
