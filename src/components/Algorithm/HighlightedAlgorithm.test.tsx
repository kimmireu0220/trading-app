import { render, screen } from "@testing-library/react";

import HighlightedAlgorithm from "./HighlightedAlgorithm";

describe("HighlightedAlgorithm component", () => {
  test("renders the title", () => {
    const algorithmConfig = {
      title: "Test Title",
      buyAlgorithm: "Price",
      buyTarget: "10",
      sellAlgorithm: "Price",
      sellTarget: "20",
      description: "Test Description",
    };

    render(<HighlightedAlgorithm algorithmConfig={algorithmConfig} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Buy : $10 (Price)")).toBeInTheDocument();
    expect(screen.getByText("Sell : $20 (Price)")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });
});
