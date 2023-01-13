import { createStore } from "redux";

const initialAuthState = { isLogin: true };

const authReducer = (state = initialAuthState, action) => {
  if (action.type === "login") {
    return {
      isLogin: true,
    };
  }

  if (action.type === "logout") {
    return {
      isLogin: false,
    };
  }

  return state;
};

const store = createStore(authReducer);

export default store;
