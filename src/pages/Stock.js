import React, { Fragment, useCallback, useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { useParams } from "react-router-dom";

import NotFound from "./NotFound";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const Stock = () => {
  const [currentPrice, setCurrentPrice] = useState();
  const [changePercent, setChangePercent] = useState();
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);

  const [isData, setIsData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const { ticker } = params;

  const fetchStock = useCallback(async () => {
    const API_KEY = "ROBZCXJTHD73QQTD";
    const currentPriceApi = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY}`;
    const dailyPriceApi = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&outputsize=compact&apikey=${API_KEY}`;

    try {
      const reponse = await fetch(currentPriceApi);
      const data = await reponse.json();

      setCurrentPrice(+data["Global Quote"]["05. price"]);
      setChangePercent(
        +data["Global Quote"]["10. change percent"].slice(0, -1)
      );
    } catch (error) {
      console.log(error);
    }

    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    try {
      const reponse = await fetch(dailyPriceApi);
      const data = await reponse.json();

      setIsData(true);
      setIsLoading(false);

      if (data["Time Series (Daily)"] === undefined) {
        setIsData(false);
        setIsLoading(false);
      }

      for (const key in data["Time Series (Daily)"]) {
        stockChartXValuesFunction.push(key);
        stockChartYValuesFunction.push(
          data["Time Series (Daily)"][key]["4. close"]
        );
      }
    } catch (error) {
      console.log(error);
    }

    setStockChartXValues(stockChartXValuesFunction);
    setStockChartYValues(stockChartYValuesFunction);
  }, [ticker]);

  useEffect(() => {
    setIsLoading(true);
    fetchStock();
  }, [fetchStock]);

  return (
    <div>
      {isLoading && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && isData && (
        <Fragment>
          <h1>{`${ticker.toUpperCase()}`}</h1>
          <h2>{`${currentPrice} (${changePercent.toFixed(2)}%)`}</h2>
          <Plot
            data={[
              {
                x: stockChartXValues,
                y: stockChartYValues,
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "red" },
              },
            ]}
            layout={{
              width: 720,
              height: 440,
              title: "Daily Price Chart",
            }}
          />
        </Fragment>
      )}
      {!isLoading && !isData && (
        <NotFound text="Can't find stock data. Please check your ticker or just retry it" />
      )}
    </div>
  );
};

export default Stock;
