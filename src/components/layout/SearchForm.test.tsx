import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import SearchForm from "./SearchForm";

describe("SearchForm component", () => {
  test("should render correctly", () => {
    render(
      <BrowserRouter>
        <SearchForm />
      </BrowserRouter>
    );

    const form = screen.getByRole("textbox");
    const input = screen.getByPlaceholderText("Search a ticker");
    const button = screen.getByRole("button");

    expect(form).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("navigates to the trading page when the button is clicked", () => {
    render(
      <BrowserRouter>
        <SearchForm />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(
      "Search a ticker"
    ) as HTMLInputElement;
    const searchButton = screen.getByRole("button");

    fireEvent.input(input, { target: { value: "ticker" } });
    fireEvent.click(searchButton);

    expect(window.location.pathname).toBe("/trading/ticker");
  });
});
