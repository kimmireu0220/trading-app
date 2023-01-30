import { render, cleanup, screen } from "@testing-library/react";

import StockStatistics from "./StockStatistics";

const mockData = {
  Beta: "0.5",
  EBITDA: "2000000000",
  PEGRatio: "1.5",
  BookValue: "10",
  ForwardPE: "20",
  TrailingPE: "15",
  RevenueTTM: "100000000000",
  EVToEBITDA: "12",
  EVToRevenue: "0.5",
  ProfitMargin: "0.1",
  DividendDate: "2023-02-01",
  FiscalYearEnd: "2023-12-31",
  DilutedEPSTTM: "5",
  DividendYield: "0.03",
  ExDividendDate: "2023-01-31",
  GrossProfitTTM: "50000000000",
  PriceToBookRatio: "2",
  SharesOutstanding: "1000000000",
  ReturnOnAssetsTTM: "0.05",
  ReturnOnEquityTTM: "0.1",
  RevenuePerShareTTM: "1000",
  OperatingMarginTTM: "0.05",
  MarketCapitalization: "1000000000000",
  PriceToSalesRatioTTM: "5",
  QuarterlyRevenueGrowthYOY: "0.05",
  QuarterlyEarningsGrowthYOY: "0.1",
};

afterEach(cleanup);

describe("StockStatistics component", () => {
  test("renders the component correctly", () => {
    render(
      <StockStatistics
        WeekLow_52="100"
        WeekHigh_52="200"
        DayMovingAverage_50="150"
        DayMovingAverage_200="180"
        detailData={mockData}
      />
    );

    expect(screen.getByText("Beta (5Y Monthly)")).toBeInTheDocument();
  });
});
