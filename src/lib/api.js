const API_KEY = process.env.REACT_APP_API_KEY;

export const getTodayStockData = async (ticker) => {
  const GLOBAL_QUOTE_API = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY}`;

  const response = await fetch(GLOBAL_QUOTE_API);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not get today stock data.");
  }

  const result = {
    price: +data["Global Quote"]["05. price"],
    change: +data["Global Quote"]["10. change percent"].slice(0, -1),
  };

  return result;
};

export const getDailyStockData = async (ticker) => {
  const TIME_SERIES_DAILY_ADJUSTED_API = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&outputsize=compact&apikey=${API_KEY}`;

  const response = await fetch(TIME_SERIES_DAILY_ADJUSTED_API);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not get daily stock data.");
  }

  let xValues = [];
  let yValues = [];

  for (const key in data["Time Series (Daily)"]) {
    xValues.push(key);
    yValues.push(data["Time Series (Daily)"][key]["4. close"]);
  }

  const result = {
    xValues,
    yValues,
  };

  return result;
};
