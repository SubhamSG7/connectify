import { createSlice } from "@reduxjs/toolkit";
import { handleValidation } from "../Handlers/validationHandler";

const SignupSlice = createSlice({
  name: "SignupSlice",
  initialState: {
    userInfo: {},
    error: {},
    validationError: {},
  },
  reducers: {
    addInfo: (state, action) => {
      state.userInfo[action.payload.name] = action.payload.value;
    },
    clearInfo: (state, action) => {},
    checkValidation: (state, action) => {
      const incomingType = action.payload.type;
      const value = state.userInfo[action.payload.type];
      let incomingError = handleValidation(incomingType, value);
      if (incomingError)
        state.validationError = { ...state.validationError, ...incomingError };
      else delete state.validationError[incomingType];
    },
  },
});
export const { addInfo, clearInfo, checkValidation } = SignupSlice.actions;
export default SignupSlice.reducer;
