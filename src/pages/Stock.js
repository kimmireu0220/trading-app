import { useParams } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";

import useHttp from "../hooks/use-http";
import NotFound from "../pages/NotFound";
import StockInfo from "../components/Stock/StockInfo";
import StockChart from "../components/Stock/StockChart";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import StockAlgoritm from "../components/Stock/StockAlgorithm";
import StockNavigation from "../components/Stock/StockNavigation";
import {
  getStockDetailData,
  getTodayStockData,
  getDailyStockData,
} from "../lib/api";

const Stock = () => {
  const params = useParams();
  const { ticker } = params;
  const [selectedInfo, setSelectedInfo] = useState("chart");

  const infoSelectHandler = (event) => {
    setSelectedInfo(event.target.value);
  };

  console.log(selectedInfo);

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

  let content = (
    <NotFound text="Can't find stock data. Please check your ticker or just retry it" />
  );

  if (detailData && todayData && dailyData) {
    const { name } = detailData;
    const { price, change } = todayData;
    const { days, closePrices } = dailyData;

    content = (
      <Fragment>
        <StockInfo
          name={name}
          price={price.toFixed(2)}
          change={change.toFixed(2)}
          ticker={ticker.toUpperCase()}
        />
        <StockNavigation onSelect={infoSelectHandler} />
        {selectedInfo === "chart" && (
          <StockChart xValues={days} yValues={closePrices} />
        )}
        <StockAlgoritm days={days} closePrices={closePrices} />
      </Fragment>
    );
  }

  if (
    detailDataStatus === "pending" ||
    todayDataStatus === "pending" ||
    dailyDataStatus === "pending"
  ) {
    content = <LoadingSpinner />;
  }

  return content;
};

export default Stock;
