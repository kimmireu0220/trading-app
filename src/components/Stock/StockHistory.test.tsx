import { render, screen } from "@testing-library/react";

import StockHistory from "./StockHistory";

const historyConfig = {
  days: ["01/01/2021", "01/02/2021", "01/03/2021"],
  opens: ["100", "120", "110"],
  highs: ["110", "130", "140"],
  lows: ["90", "95", "100"],
  closes: ["105", "125", "135"],
  volumes: ["10000", "20000", "15000"],
};

describe("StockHistory component", () => {
  test("renders the data correctly", () => {
    render(<StockHistory historyConfig={historyConfig} />);

    const dayList = screen.getAllByText("Date");
    const openList = screen.getAllByText("Open");
    const highList = screen.getAllByText("High");
    const lowList = screen.getAllByText("Low");
    const closeList = screen.getAllByText("Close");
    const volumeList = screen.getAllByText("Volume");

    expect(dayList.length).toBe(1);
    expect(openList.length).toBe(1);
    expect(highList.length).toBe(1);
    expect(lowList.length).toBe(1);
    expect(closeList.length).toBe(1);
    expect(volumeList.length).toBe(1);
  });
});
