import { createSlice } from "@reduxjs/toolkit";

const ProfileSlice = createSlice({
  name: "profileSlice",
  initialState: {
    profileInfo: {},
    valid: false,
    profileResponse: {},
  },
  reducers: {
    setProfile: (state, action) => {
      state.profileInfo = action.payload;
    },
    setProfileResponse: (state, action) => {
      state.profileResponse = action.payload;
      state.valid = action.payload?.status;
    },
  },
});
export const { setProfile, setProfileResponse } = ProfileSlice.actions;
export default ProfileSlice.reducer;
