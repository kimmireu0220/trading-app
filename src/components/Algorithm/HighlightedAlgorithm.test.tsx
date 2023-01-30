import { render, screen } from "@testing-library/react";

import HighlightedAlgorithm from "./HighlightedAlgorithm";

describe("HighlightedAlgorithm component", () => {
  test("renders the title", () => {
    const algorithmConfig = {
      title: "Example Algorithm",
      buyAlgorithm: "Price",
      buyTarget: "10",
      sellAlgorithm: "Price",
      sellTarget: "20",
      description: "This is an example algorithm",
    };

    render(<HighlightedAlgorithm algorithmConfig={algorithmConfig} />);

    expect(screen.getByText("Example Algorithm")).toBeInTheDocument();
  });

  test("renders the buy and sell information", () => {
    const algorithmConfig = {
      title: "Example Algorithm",
      buyAlgorithm: "Price",
      buyTarget: "10",
      sellAlgorithm: "Price",
      sellTarget: "20",
      description: "This is an example algorithm",
    };

    render(<HighlightedAlgorithm algorithmConfig={algorithmConfig} />);

    expect(screen.getByText("Buy : $10 (Price)")).toBeInTheDocument();
    expect(screen.getByText("Sell : $20 (Price)")).toBeInTheDocument();
  });

  test("renders the description", () => {
    const algorithmConfig = {
      title: "Example Algorithm",
      buyAlgorithm: "Price",
      buyTarget: "10",
      sellAlgorithm: "Price",
      sellTarget: "20",
      description: "This is an example algorithm",
    };

    render(<HighlightedAlgorithm algorithmConfig={algorithmConfig} />);

    expect(
      screen.getByText("This is an example algorithm")
    ).toBeInTheDocument();
  });
});
