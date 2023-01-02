import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";

import useHttp from "../hooks/use-http";
import { getTodayStockData, getDailyStockData } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import StockPrice from "../components/Stock/StockPrice";
import StockChart from "../components/Stock/StockChart";
import NotFound from "../pages/NotFound";

const Stock = () => {
  const params = useParams();
  const { ticker } = params;

  const {
    sendRequest: getTodayData,
    data: todayData,
    status: todayDataStatus,
  } = useHttp(getTodayStockData);

  const {
    sendRequest: getDailyData,
    data: dailyData,
    status: dailyDataStatus,
  } = useHttp(getDailyStockData);

  let price, change;
  let xValues, yValues;

  if (todayData && dailyData) {
    price = todayData.price;
    change = todayData.change;
    xValues = dailyData.xValues;
    yValues = dailyData.yValues;
  }

  useEffect(() => {
    getTodayData(ticker);
    getDailyData(ticker);
  }, [getTodayData, getDailyData, ticker]);

  let content;

  if (todayDataStatus === "pending" || dailyDataStatus === "pending") {
    content = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (todayData && dailyData) {
    content = (
      <div>
        <StockPrice
          ticker={ticker.toUpperCase()}
          price={price}
          change={change.toFixed(2)}
        />
        <StockChart xValues={xValues} yValues={yValues} />
      </div>
    );
  }

  if (
    todayDataStatus === "completed" &&
    dailyDataStatus === "completed" &&
    (!todayData ||
      !dailyData ||
      dailyData.xValues.length === 0 ||
      dailyData.yValues.length === 0)
  ) {
    content = (
      <NotFound text="Can't find stock data. Please check your ticker or just retry it" />
    );
  }

  return <Fragment>{content}</Fragment>;
};

export default Stock;
