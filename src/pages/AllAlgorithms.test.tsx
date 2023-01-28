import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import AllAlgorithms from "./AllAlgorithms";

describe("AllAlgorithms page", () => {
  test('renders "Add an Algorithm" link', () => {
    render(
      <BrowserRouter>
        <AllAlgorithms />
      </BrowserRouter>
    );

    const link = screen.getByRole("link", { name: "Add an Algorithm" });
    expect(link.getAttribute("href")).toBe("/add-algorithm");
  });
});