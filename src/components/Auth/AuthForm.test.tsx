import { render, screen, fireEvent } from "@testing-library/react";

import AuthForm from "./AuthForm";

describe("AuthForm component", () => {
  test("switch auth mode when button is clicked", () => {
    render(<AuthForm onSignUp={() => {}} onSignIn={() => {}} />);

    const switchAuthModeButton = screen.getByText(/create new account/i);
    fireEvent.click(switchAuthModeButton);

    expect(
      screen.getByText(/login with existing account/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/create account/i)).toBeInTheDocument();
  });
});
