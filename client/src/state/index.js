import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

const initialState = {
  mode: "dark",
  userId: "63701cc1f03239b7f700000e",
  loggedIn: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    login: (state) => {
      state.loggedIn = true;
      state.userId = "64448edfce22d72d7e1ca276";
    },
    updateId: (state, action) => {
      state.userId = action.payload;
    },
    logout: (state) => {
      state.loggedIn = false;
    },
  },
});

export const { setMode } = globalSlice.actions;
export const { login } = globalSlice.actions;
export const { logout } = globalSlice.actions;
export const { updateId } = globalSlice.actions;

export default globalSlice.reducer;
