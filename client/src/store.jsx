import { configureStore } from "@reduxjs/toolkit";
import SignupSlice from "./Slices/SignupSlice";

export const store = configureStore({
  reducer: { SignupSlice },
});
