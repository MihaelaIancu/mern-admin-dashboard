import { combineReducers, createSlice } from "@reduxjs/toolkit";
import { api } from "state/api";

const modeInitialState = {
  mode: "dark",
};

const authInitialState = {
  userId: "63701cc1f03239b7f700000e",
  token: "",
  loggedIn: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState: modeInitialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.userId = action.payload;
      state.token = action.payload;
    },
    logout: (state) => {
      state.loggedIn = false;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    }
  },
});

const allReducers = combineReducers({
  global: globalSlice.reducer,
  auth: authSlice.reducer,
  [api.reducerPath]: api.reducer,
});

export const { setMode } = globalSlice.actions;
export const { login } = authSlice.actions;
export const { logout } = authSlice.actions;
export const { updateToken } = authSlice.actions;

export default allReducers;
