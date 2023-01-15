import { createStore } from "redux";

const initialAuthState = {
  isLoggedin: false,
  token: "",
};

const authReducer = (state = initialAuthState, action) => {
  if (action.type === "login") {
    return {
      isLoggedin: true,
      token: action.token,
    };
  }

  if (action.type === "logout") {
    return {
      isLoggedin: false,
      token: "",
    };
  }

  return state;
};

const store = createStore(authReducer);

export default store;
