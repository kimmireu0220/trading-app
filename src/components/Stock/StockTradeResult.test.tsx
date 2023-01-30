import { render, screen } from "@testing-library/react";

import StockTradeResult from "./StockTradeResult";

describe("StockTradeResult component", () => {
  const days = ["2021-01-01", "2021-01-02", "2021-01-03", "2021-01-04"];
  const closes = ["20", "40", "60", "80"];
  const isSubmitted = true;
  const algorithm = {
    buyAlgorithm: "Price",
    buyTarget: "40",
    sellAlgorithm: "Price",
    sellTarget: "60",
  };

  test("displays buy algorithm, net profit, and sell algorithm", () => {
    render(
      <StockTradeResult
        days={days}
        closes={closes}
        isSubmitted={isSubmitted}
        algorithm={algorithm}
      />
    );
    const buyAlgorithm = screen.getByText(
      `Buy : $${algorithm.buyTarget} (${algorithm.buyAlgorithm})`
    );
    const netProfit = screen.getByText("Net Profit");
    const sellAlgorithm = screen.getByText(
      `Sell : $${algorithm.sellTarget} (${algorithm.sellAlgorithm})`
    );

    expect(buyAlgorithm).toBeInTheDocument();
    expect(netProfit).toBeInTheDocument();
    expect(sellAlgorithm).toBeInTheDocument();
  });
});
