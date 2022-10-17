import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  refreshToken: null,
  userData: {},
  darkmode: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload.accessToken ?? state.accessToken;
      state.refreshToken = action.payload.refreshToken ?? state.refreshToken;
    },
    removeToken: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
    },
    setUserData: (state, action) => {
      state.userData = { ...action.payload };
    },
    toggleMode: (state) => {
      state.darkmode = !state.darkmode;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken, removeToken, setUserData, toggleMode } =
  userSlice.actions;

export default userSlice.reducer;
