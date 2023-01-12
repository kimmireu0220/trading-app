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
import StockAlgoritm from "../components/Stock/StockAlgorithm";

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

  useEffect(() => {
    getDetailData(ticker);
    getTodayData(ticker);
    getDailyData(ticker);
  }, [getDetailData, getTodayData, getDailyData, ticker]);

  let content;

  if (detailData && todayData && dailyData) {
    const { name } = detailData;
    const { price, change } = todayData;
    const { days, closePrices } = dailyData;

    content = (
      <Fragment>
        <StockInfo
          name={name}
          ticker={ticker.toUpperCase()}
          price={price.toFixed(2)}
          change={change.toFixed(2)}
        />
        <StockChart xValues={days} yValues={closePrices} />
        <StockAlgoritm days={days} closePrices={closePrices} />
      </Fragment>
    );
  }

  // Error or Loading status

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

  if (
    detailDataStatus === "completed" &&
    todayDataStatus === "completed" &&
    dailyDataStatus === "completed" &&
    (!detailData ||
      !todayData ||
      !dailyData ||
      detailData.name === undefined ||
      dailyData.days.length === 0 ||
      dailyData.closePrices.length === 0)
  ) {
    content = (
      <NotFound text="Can't find stock data. Please check your ticker or just retry it" />
    );
  }

  return <Fragment>{content}</Fragment>;
};

export default Stock;
