import { useParams } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";

import useHttp from "../hooks/use-http";
import NotFound from "../pages/NotFound";
import StockInfo from "../components/Stock/StockInfo";
import StockChart from "../components/Stock/StockChart";
import StockHistory from "../components/Stock/StockHistory";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import StockAlgoritm from "../components/Stock/StockAlgorithm";
import StockStatistics from "../components/Stock/StockStatistics";
import StockNavigation from "../components/Stock/StockNavigation";
import StockConversations from "../components/Stock/StockConversations";
import {
  getStockDetailData,
  getTodayStockData,
  getDailyStockData,
} from "../lib/api";

const Stock = () => {
  const params = useParams();
  const { ticker } = params;

  const [selectedMenu, setSelectedMenu] = useState("chart");

  const infoSelectHandler = (event) => {
    setSelectedMenu(event.target.value);
  };

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
    content = (
      <Fragment>
        <StockInfo
          name={detailData["Name"]}
          price={todayData.price.toFixed(2)}
          change={todayData.change.toFixed(2)}
          ticker={ticker.toUpperCase()}
        />
        <StockNavigation onSelect={infoSelectHandler} menu={selectedMenu} />
        {selectedMenu === "chart" && (
          <Fragment>
            <StockChart
              xValues={dailyData.days}
              yValues={dailyData.closePrices}
            />
            <StockAlgoritm
              days={dailyData.days}
              closePrices={dailyData.closePrices}
            />
          </Fragment>
        )}
        {selectedMenu === "conversations" && (
          <StockConversations ticker={ticker} />
        )}
        {selectedMenu === "statistics" && (
          <StockStatistics ticker={ticker} detailData={detailData} />
        )}
        {selectedMenu === "history" && <StockHistory />}
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
