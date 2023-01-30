import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";

import UserProfile from "./UserProfile";

const authState = { token: "test_token" };
const rootReducer = (state = { auth: authState }) => state;
const store = createStore(rootReducer);

describe("UserProfile component", () => {
  test("renders correctly", () => {
    render(
      <Provider store={store}>
        <UserProfile />
      </Provider>
    );

    expect(screen.getByText("User Profile")).toBeInTheDocument();
    expect(screen.getByLabelText("New Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByText("Change Password")).toBeInTheDocument();
  });
});
