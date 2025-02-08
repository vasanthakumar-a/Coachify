import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export const loginUser = (credentials) => async (dispatch) => {
  const res = await axios.post("http://localhost:5001/auth/login", credentials);
  dispatch(setUser(res.data));
};

export const googleLogin = () => {
  window.open("http://localhost:5001/auth/google", "_self");
};

export default authSlice.reducer;
