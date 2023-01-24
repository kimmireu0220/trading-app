import Card from "../UI/Card";

import classes from "./StockStatistics.module.css";

const StockStatistics = (props) => {
  const { detailData } = props;

  const WeekLow_52 = detailData["52WeekLow"];
  const WeekHigh_52 = detailData["52WeekHigh"];
  const DayMovingAverage_50 = detailData["50DayMovingAverage"];
  const DayMovingAverage_200 = detailData["200DayMovingAverage"];

  const {
    Beta,
    EBITDA,
    PEGRatio,
    BookValue,
    ForwardPE,
    TrailingPE,
    RevenueTTM,
    EVToEBITDA,
    EVToRevenue,
    ProfitMargin,
    DividendDate,
    FiscalYearEnd,
    DilutedEPSTTM,
    DividendYield,
    ExDividendDate,
    GrossProfitTTM,
    PriceToBookRatio,
    SharesOutstanding,
    ReturnOnAssetsTTM,
    ReturnOnEquityTTM,
    RevenuePerShareTTM,
    OperatingMarginTTM,
    MarketCapitalization,
    PriceToSalesRatioTTM,
    QuarterlyRevenueGrowthYOY,
    QuarterlyEarningsGrowthYOY,
  } = detailData;

  const valuationMeasuresObj = {
    "Market Cap": `${(+MarketCapitalization / 10 ** 12).toFixed(2)}T`,
    "Trailing P/E": (+TrailingPE).toFixed(2),
    "Forward P/E": (+ForwardPE).toFixed(2),
    "PEG Ratio": (+PEGRatio).toFixed(2),
    "Price/Sales": (+PriceToSalesRatioTTM).toFixed(2),
    "Price/Book": (+PriceToBookRatio).toFixed(2),
    "EV/Revenue": (+EVToRevenue).toFixed(2),
    "EV/EBITDA": (+EVToEBITDA).toFixed(2),
  };

  const fiscalYearObj = {
    "Fiscal Year Ends": FiscalYearEnd,
  };

  const profitablityObj = {
    "Profit Margin": `${(+ProfitMargin * 100).toFixed(2)}%`,
    "Operating Margin (TTM)": `${(+OperatingMarginTTM * 100).toFixed(2)}%`,
  };

  const managementEffectivenessObj = {
    "Return on Assets (TTM)": `${(+ReturnOnAssetsTTM * 100).toFixed(2)}%`,
    "Return on Equity (TTM)": `${(+ReturnOnEquityTTM * 100).toFixed(2)}%`,
  };

  const incomeStatementObj = {
    "Revenue (TTM)": `${(Number(RevenueTTM) / 10 ** 9).toFixed(2)}B`,
    "Revenue/Share (TTM)": (+RevenuePerShareTTM).toFixed(2),
    "Revenue Growth (YoY)": `${(+QuarterlyRevenueGrowthYOY * 100).toFixed(2)}%`,
    "Gross Profit (TTM)": `${(Number(GrossProfitTTM) / 10 ** 9).toFixed(2)}B`,
    EBITDA: `${(Number(EBITDA) / 10 ** 9).toFixed(2)}B`,
    "Diluted EPS (TTM)": (+DilutedEPSTTM).toFixed(2),
    "Earnings Growth (YoY)": `${(+QuarterlyEarningsGrowthYOY * 100).toFixed(
      2
    )}%`,
  };

  const balanceSheetObj = {
    "Book Value Per Share": Number(BookValue).toFixed(2),
  };

  const stockPriceHistoryObj = {
    "Beta (5Y Monthly)": (+Beta).toFixed(2),
    "52 Week High": `${(+WeekHigh_52).toFixed(2)}`,
    "52 Week Low": `${(+WeekLow_52).toFixed(2)}`,
    "50-Day Average": `${(+DayMovingAverage_50).toFixed(2)}`,
    "200-Day Average": `${(+DayMovingAverage_200).toFixed(2)}`,
  };

  const shareStatisticsObj = {
    "Shares Outstanding": `${(Number(SharesOutstanding) / 10 ** 9).toFixed(
      2
    )}B`,
  };

  const dividendsObj = {
    "Dividend Yield": `${(+DividendYield * 100).toFixed(2)}%`,
    "Dividend Date": DividendDate,
    "Ex-Dividend Date ": ExDividendDate,
  };

  const valuationMeasureArr = Object.entries(valuationMeasuresObj);
  const fiscalYearArr = Object.entries(fiscalYearObj);
  const profitablityArr = Object.entries(profitablityObj);
  const managementEffectivenessArr = Object.entries(managementEffectivenessObj);
  const incomeStatementArr = Object.entries(incomeStatementObj);
  const balanceSheetArr = Object.entries(balanceSheetObj);
  const stockPriceHistoryArr = Object.entries(stockPriceHistoryObj);
  const shareStatisticArr = Object.entries(shareStatisticsObj);
  const dividendsArr = Object.entries(dividendsObj);

  return (
    <Card>
      <p className={classes.current}>( Current : USD )</p>
      <div className={classes.container}>
        <div>
          <p className={classes.title}>Valuation Measures</p>
          <div className={classes.hr}>
            <hr />
          </div>
          <ul className={classes.statistics}>
            {valuationMeasureArr.map((valuationMeasure, index) => (
              <li key={index}>
                <div>{valuationMeasure[0]}</div>
                <div>{valuationMeasure[1]}</div>
              </li>
            ))}
          </ul>
          <div className={classes.hr}>
            <hr />
          </div>
          <br />
          <p className={classes.title}>Financial Hightlights</p>
          <div className={classes.hr}>
            <hr />
          </div>
          <ul className={classes.statistics}>
            {fiscalYearArr.map((fiscalYear, index) => (
              <li key={index}>
                <div>{fiscalYear[0]}</div>
                <div>{fiscalYear[1]}</div>
              </li>
            ))}
          </ul>
          <div className={classes.hr}>
            <hr />
          </div>
          <ul className={classes.statistics}>
            {profitablityArr.map((profitablity, index) => (
              <li key={index}>
                <div>{profitablity[0]}</div>
                <div>{profitablity[1]}</div>
              </li>
            ))}
          </ul>
          <div className={classes.hr}>
            <hr />
          </div>
          <ul className={classes.statistics}>
            {managementEffectivenessArr.map(
              (managementEffectiveness, index) => (
                <li key={index}>
                  <div>{managementEffectiveness[0]}</div>
                  <div>{managementEffectiveness[1]}</div>
                </li>
              )
            )}
          </ul>
          <div className={classes.hr}>
            <hr />
          </div>
          <ul className={classes.statistics}>
            {incomeStatementArr.map((incomeStatement, index) => (
              <li key={index}>
                <div>{incomeStatement[0]}</div>
                <div>{incomeStatement[1]}</div>
              </li>
            ))}
          </ul>
          <div className={classes.hr}>
            <hr />
          </div>
          <ul className={classes.statistics}>
            {balanceSheetArr.map((balanceSheet, index) => (
              <li key={index}>
                <div>{balanceSheet[0]}</div>
                <div>{balanceSheet[1]}</div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={classes.title}>Trading Information</p>
          <div className={classes.hr}>
            <hr />
          </div>
          <ul className={classes.statistics}>
            {stockPriceHistoryArr.map((stockPriceHistory, index) => (
              <li key={index}>
                <div>{stockPriceHistory[0]}</div>
                <div>{stockPriceHistory[1]}</div>
              </li>
            ))}
          </ul>
          <div className={classes.hr}>
            <hr />
          </div>
          <ul className={classes.statistics}>
            {shareStatisticArr.map((shareStatistic, index) => (
              <li key={index}>
                <div>{shareStatistic[0]}</div>
                <div>{shareStatistic[1]}</div>
              </li>
            ))}
          </ul>
          <div className={classes.hr}>
            <hr />
          </div>
          <ul className={classes.statistics}>
            {dividendsArr.map((dividends, index) => (
              <li key={index}>
                <div>{dividends[0]}</div>
                <div>{dividends[1]}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default StockStatistics;
