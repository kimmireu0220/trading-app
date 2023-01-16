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
      localStorage.setItem("token", token);
      state.isLoggedIn = true;
      state.token = token;
    },
    logout(state) {
      localStorage.removeItem("token");
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
