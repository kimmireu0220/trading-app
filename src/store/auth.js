import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isLoggedIn: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "authentification",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      const token = action.payload;
      state.isLoggedIn = true;
      state.token = token;
      localStorage.setItem("token", token);
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
