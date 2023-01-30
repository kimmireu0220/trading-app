import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { render, screen } from "@testing-library/react";
import { configureStore, createSlice } from "@reduxjs/toolkit";

import NavLinks from "./NavLinks";

const authSlice = createSlice({
  name: "authentification",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

const store = configureStore({
  reducer: { auth: authSlice.reducer },
});

const LoginNavLinks = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authSlice.actions.login());
  }, [dispatch]);

  return <NavLinks size="normal" onToggle={() => {}} />;
};

const LogoutNavLinks = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authSlice.actions.logout());
  }, [dispatch]);

  return <NavLinks size="normal" onToggle={() => {}} />;
};

describe("NavLinks component", () => {
  test("should render correctly when logged in", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginNavLinks />
        </BrowserRouter>
      </Provider>
    );

    const algorithmLink = screen.getByText("Algorithm");
    const profileLink = screen.getByText("Profile");
    const logoutLink = screen.getByText("Log out");

    expect(algorithmLink).toBeInTheDocument();
    expect(profileLink).toBeInTheDocument();
    expect(logoutLink).toBeInTheDocument();
  });

  test("should render correctly when logged out", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LogoutNavLinks />
        </BrowserRouter>
      </Provider>
    );

    const loginLink = screen.getByText("Login");

    expect(loginLink).toBeInTheDocument();
  });
});
