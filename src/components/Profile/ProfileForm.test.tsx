import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import ProfileForm from "./ProfileForm";

const authState = { token: "test_token" };
const rootReducer = (state = { auth: authState }) => state;
const store = createStore(rootReducer);

describe("ProfileForm component", () => {
  test("should change the password when the form is submitted with valid inputs", () => {
    const onUpdatePassword = jest.fn();

    render(
      <Provider store={store}>
        <ProfileForm onUpdatePassword={onUpdatePassword} />
      </Provider>
    );

    const newPasswordInput = screen.getByLabelText("New Password");
    fireEvent.change(newPasswordInput, { target: { value: "new_password" } });

    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    fireEvent.change(confirmPasswordInput, {
      target: { value: "new_password" },
    });

    const submitButton = screen.getByText("Change Password");
    fireEvent.click(submitButton);

    expect(onUpdatePassword).toHaveBeenCalledWith({
      token: "test_token",
      password: "new_password",
    });
  });

  test("should display an error message when the form is submitted with invalid inputs", () => {
    const onUpdatePassword = jest.fn();

    render(
      <Provider store={store}>
        <ProfileForm onUpdatePassword={onUpdatePassword} />
      </Provider>
    );

    const newPasswordInput = screen.getByLabelText("New Password");
    fireEvent.change(newPasswordInput, { target: { value: "new_password" } });

    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    fireEvent.change(confirmPasswordInput, {
      target: { value: "wrong_password" },
    });

    const submitButton = screen.getByText("Change Password");
    fireEvent.click(submitButton);

    const warningMessage = screen.getByText(
      "Password fields mismatch or less than 6 characters."
    );
    expect(warningMessage).toBeInTheDocument();
  });
});
