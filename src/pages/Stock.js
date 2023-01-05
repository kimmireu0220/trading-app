import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";

import useHttp from "../hooks/use-http";
import {
  getStockDetailData,
  getTodayStockData,
  getDailyStockData,
} from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import StockChart from "../components/Stock/StockChart";
import NotFound from "../pages/NotFound";
import StockInfo from "../components/Stock/StockInfo";

const Stock = () => {
  const params = useParams();
  const { ticker } = params;

  const {
    sendRequest: getDetailData,
    data: detailData,
    status: detailDataStatus,
  } = useHttp(getStockDetailData);

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

  let name, price, change, xValues, yValues;

  console.log(detailData, todayData, dailyData);

  if (detailData && todayData && dailyData) {
    name = detailData.name;
    price = todayData.price;
    change = todayData.change;
    xValues = dailyData.xValues;
    yValues = dailyData.yValues;
  }

  useEffect(() => {
    getDetailData(ticker);
    getTodayData(ticker);
    getDailyData(ticker);
  }, [getDetailData, getTodayData, getDailyData, ticker]);

  let content;

  if (
    detailDataStatus === "pending" ||
    todayDataStatus === "pending" ||
    dailyDataStatus === "pending"
  ) {
    content = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (detailData && todayData && dailyData) {
    content = (
      <div>
        <StockInfo
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
    detailDataStatus === "completed" &&
    todayDataStatus === "completed" &&
    dailyDataStatus === "completed" &&
    (!detailData ||
      !todayData ||
      !dailyData ||
      detailData.name === undefined ||
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
