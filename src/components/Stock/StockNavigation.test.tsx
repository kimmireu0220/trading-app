import { render, screen } from "@testing-library/react";

import StockNavigation from "./StockNavigation";

describe("StockNavigation component", () => {
  test("renders the correct menu item as bold", () => {
    const onSelect = jest.fn();
    render(<StockNavigation menu="chart" onSelect={onSelect} />);

    const chartButton = screen.getByRole("button", { name: /chart/i });
    expect(chartButton).toHaveClass("bold");
  });

  test("calls the onSelect callback when a menu item is clicked", () => {
    const onSelect = jest.fn();
    render(<StockNavigation menu="chart" onSelect={onSelect} />);

    const historyButton = screen.getByRole("button", { name: /history/i });
    historyButton.click();

    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
