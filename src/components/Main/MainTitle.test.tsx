import { render, screen } from "@testing-library/react";

import MainTitle from "./MainTitle";

describe("MainTitle component", () => {
  test("renders main title", () => {
    render(<MainTitle />);

    const firstText = screen.getByText("Trade stocks");
    expect(firstText).toBeInTheDocument();

    const secondText = screen.getByText("with");
    expect(secondText).toBeInTheDocument();

    const thirdText = screen.getByText("your Algorithms");
    expect(thirdText).toBeInTheDocument();
  });
});
