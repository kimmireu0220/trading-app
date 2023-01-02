import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";

import useHttp from "../hooks/use-http";
import {
  getTodayStockData,
  getDailyStockData,
  getStockDetailData,
} from "../lib/api";
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

  const {
    sendRequest: getDetailData,
    data: detailData,
    status: detailDataStatus,
  } = useHttp(getStockDetailData);

  let price, change;
  let xValues, yValues;
  let name;

  if (todayData && dailyData && detailData) {
    console.log("hi");
    price = todayData.price;
    change = todayData.change;
    xValues = dailyData.xValues;
    yValues = dailyData.yValues;
    name = detailData.name;
  }

  useEffect(() => {
    getTodayData(ticker);
    getDailyData(ticker);
    getDetailData(ticker);
  }, [getTodayData, getDailyData, getDetailData, ticker]);

  let content;

  if (
    todayDataStatus === "pending" ||
    dailyDataStatus === "pending" ||
    detailDataStatus === "pending"
  ) {
    content = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (todayData && dailyData && detailData) {
    content = (
      <div>
        <StockPrice
          name={name}
          ticker={ticker.toUpperCase()}
          price={price.toFixed(2)}
          change={change.toFixed(2)}
        />
        <StockChart xValues={xValues} yValues={yValues} />
      </div>
    );
  }

  if (
    todayDataStatus === "completed" &&
    dailyDataStatus === "completed" &&
    detailDataStatus === "completed" &&
    (!todayData ||
      !dailyData ||
      !detailData ||
      dailyData.xValues.length === 0 ||
      dailyData.yValues.length === 0 ||
      detailData.name === undefined)
  ) {
    content = (
      <NotFound text="Can't find stock data. Please check your ticker or just retry it" />
    );
  }

  return <Fragment>{content}</Fragment>;
};

export default Stock;
