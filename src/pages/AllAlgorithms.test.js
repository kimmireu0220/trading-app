import "@testing-library/jest-dom";

import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import AllAlgorithms from "./AllAlgorithms";

describe("AllAlgorithms page", () => {
  test('renders link "Add an Algorithm"', () => {
    render(
      <BrowserRouter>
        <AllAlgorithms />
      </BrowserRouter>
    );

    const link = screen.getByRole("link", { name: "Add an Algorithm" });
    expect(link.href).toBe("http://localhost/add-algorithm");
  });
});
