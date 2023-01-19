import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent } from "@testing-library/react";

import App from "./App";
import store from "./store";

describe("App component", () => {
  test("renders loading spinner when searching a ticker", async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );

    const ticker = "aapl";
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: ticker },
    });
    userEvent.click(screen.getByRole("button"));

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });
});
