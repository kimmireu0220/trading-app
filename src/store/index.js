import { createStore } from "redux";

const initialAuthState = {
  isLoggedIn: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
};

const authReducer = (state = initialAuthState, action) => {
  if (action.type === "login") {
    localStorage.setItem("token", action.token);

    return {
      isLoggedIn: true,
      token: action.token,
    };
  }

  if (action.type === "logout") {
    localStorage.removeItem("token");

    return {
      isLoggedIn: false,
      token: null,
    };
  }

  return state;
};

const store = createStore(authReducer);

export default store;
