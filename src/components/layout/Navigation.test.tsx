import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";

import Navigation from "./Navigation";

import store from "../../store";

describe("Navigation component", () => {
  test('renders "Login" link', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </BrowserRouter>
    );

    const link = screen.getByRole("link", { name: "Login" });
    expect(link.getAttribute("href")).toBe("/auth");
  });
});
