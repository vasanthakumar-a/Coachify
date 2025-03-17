import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const token = Cookies.get("_token");

const initialState = {
  isAuthenticated: !!token, // Set true if token exists
  token: token || null, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
      Cookies.set("_token", action.payload, { expires: 7 }); // Store token in cookies
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      Cookies.remove("_token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
