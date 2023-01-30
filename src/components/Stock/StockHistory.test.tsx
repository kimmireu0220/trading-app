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
    expect(dayList.length).toBe(1);

    const openList = screen.getAllByText("Open");
    expect(openList.length).toBe(1);

    const highList = screen.getAllByText("High");
    expect(highList.length).toBe(1);

    const lowList = screen.getAllByText("Low");
    expect(lowList.length).toBe(1);

    const closeList = screen.getAllByText("Close");
    expect(closeList.length).toBe(1);

    const volumeList = screen.getAllByText("Volume");
    expect(volumeList.length).toBe(1);
  });
});
