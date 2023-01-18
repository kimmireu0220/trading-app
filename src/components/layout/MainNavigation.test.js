import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import store from "../../store";
import MainNavigation from "./MainNavigation";

describe("MainNavigation component", () => {
  test('renders "Login" link', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MainNavigation />
        </Provider>
      </BrowserRouter>
    );

    const link = screen.getByRole("link", { name: "Login" });
    expect(link.href).toBe("http://localhost/auth");
  });
});
