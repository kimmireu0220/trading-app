import { render, screen } from "@testing-library/react";

import StockInfo from "./StockInfo";

describe("StockInfo component", () => {
  test("renders the correct information", () => {
    const ticker = "AAPL";
    const name = "Apple Inc.";
    const price = 132.21;
    const change = 1.23;

    render(
      <StockInfo ticker={ticker} name={name} price={price} change={change} />
    );

    expect(screen.getByText(`${name} (${ticker})`)).toBeInTheDocument();
    expect(screen.getByText(`$${price}`)).toBeInTheDocument();
    expect(screen.getByText(`(${change}%)`)).toBeInTheDocument();
  });

  test("renders the change as positive if it is greater than 0", () => {
    const ticker = "AAPL";
    const name = "Apple Inc.";
    const price = 132.21;
    const change = 1.23;

    render(
      <StockInfo ticker={ticker} name={name} price={price} change={change} />
    );

    expect(screen.getByText(`(${change}%)`)).toHaveClass("up");
  });

  test("renders the change as negative if it is less than 0", () => {
    const ticker = "AAPL";
    const name = "Apple Inc.";
    const price = 132.21;
    const change = -1.23;

    render(
      <StockInfo ticker={ticker} name={name} price={price} change={change} />
    );

    expect(screen.getByText(`(${change}%)`)).toHaveClass("down");
  });
});
