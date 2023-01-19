import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isLoggedIn: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
  email: null,
};

const authSlice = createSlice({
  name: "authentification",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      const { token, email } = action.payload;
      state.isLoggedIn = true;
      state.token = token;
      state.email = email;
      localStorage.setItem("token", token);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.email = null;
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
