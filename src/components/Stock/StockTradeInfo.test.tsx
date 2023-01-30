import { render, screen } from "@testing-library/react";

import StockTradeInfo from "./StockTradeInfo";

describe("StockTradeInfo component", () => {
  const buy = { day: new Date("2023-01-01"), price: "100" };
  const sell = { day: new Date("2023-01-02"), price: "110" };
  const result = { buy, sell, profit: "10" };

  test("renders correctly", () => {
    render(<StockTradeInfo result={result} />);

    expect(screen.getByText("2023-01-01")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("$10")).toBeInTheDocument();
    expect(screen.getByText("2023-01-02")).toBeInTheDocument();
    expect(screen.getByText("$110")).toBeInTheDocument();
  });
});
