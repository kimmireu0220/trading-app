import { fireEvent, render, screen } from "@testing-library/react";

import StockAlgorithm from "./StockAlgorithm";

const algorithmConfig = {
  days: [Date.now().toLocaleString()],
  closes: ["100"],
};

const DUMMY_ALGORITHM = {
  test_id_1: {
    buyAlgorithm: "Price",
    buyTarget: "100",
    sellAlgorithm: "Price",
    sellTarget: "200",
  },
};

describe("StockAlgorithm component", () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockResolvedValue({ json: () => DUMMY_ALGORITHM });
  });

  test("renders without crashing", async () => {
    render(<StockAlgorithm algorithmConfig={algorithmConfig} />);

    expect(await screen.findByText("Select Algorithm")).toBeInTheDocument();
    expect(await screen.findByText("Trade")).toBeInTheDocument();
  });

  test("displays options in the select element", async () => {
    render(<StockAlgorithm algorithmConfig={algorithmConfig} />);

    const options = await screen.findAllByRole("option");
    expect(options.length).toBeGreaterThan(0);
  });

  test("displays error message when no algorithm is selected", async () => {
    let backdropRoot: HTMLDivElement;
    let overlayRoot: HTMLDivElement;

    backdropRoot = document.createElement("div");
    backdropRoot.id = "backdrop-root";
    document.body.appendChild(backdropRoot);

    overlayRoot = document.createElement("div");
    overlayRoot.id = "overlay-root";
    document.body.appendChild(overlayRoot);

    render(<StockAlgorithm algorithmConfig={algorithmConfig} />);

    const tradeButton = await screen.findByText(/Trade/i);
    fireEvent.click(tradeButton);

    const errorMessage = await screen.findByText(
      "Please select your algorithm"
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
