import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import AllAlgorithms from "./AllAlgorithms";

describe("AllAlgorithms page", () => {
  test('renders button contains correct value, "Add an Algorithm"', () => {
    render(<AllAlgorithms />);

    screen.getByRole("button", { name: "Add an Algorithm" });
  });
});
