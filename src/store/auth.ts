import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  isLoggedIn: boolean;
  token: string | null;
  email: string | null;
};

const initialAuthState: AuthState = {
  isLoggedIn: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
  email: localStorage.getItem("email"),
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
      localStorage.setItem("email", email);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.email = null;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
