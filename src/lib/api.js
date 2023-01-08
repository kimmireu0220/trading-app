const API_KEY = process.env.REACT_APP_API_KEY;
const FIREBASE_DOMAIN = process.env.REACT_APP_FIREBASE_DOMAIN;

export const getStockDetailData = async (ticker) => {
  const OVERVIEW_API = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${API_KEY}`;

  const response = await fetch(OVERVIEW_API);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not get today stock data.");
  }

  const result = {
    name: data["Name"],
  };

  return result;
};

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

  let days = [];
  let closePrices = [];

  for (const key in data["Time Series (Daily)"]) {
    days.push(key);
    closePrices.push(data["Time Series (Daily)"][key]["4. close"]);
  }

  const result = {
    days,
    closePrices,
  };

  return result;
};

export const addAlgorithm = async (algorithmData) => {
  const response = await fetch(`${FIREBASE_DOMAIN}/algorithms.json`, {
    method: "POST",
    body: JSON.stringify(algorithmData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create algorithm.");
  }

  return null;
};

export const editAlgorithm = async (algorithmData) => {
  const {
    algorithmId,
    title,
    buyAlgorithm,
    buyTarget,
    sellAlgorithm,
    sellTarget,
    description,
  } = algorithmData;

  const body = {
    title,
    buyAlgorithm,
    buyTarget,
    sellAlgorithm,
    sellTarget,
    description,
  };

  const response = await fetch(
    `${FIREBASE_DOMAIN}/algorithms/${algorithmId}.json`,
    {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create algorithm.");
  }

  return null;
};

export const getAllAlgorithms = async () => {
  const response = await fetch(`${FIREBASE_DOMAIN}/algorithms.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch algorithm.");
  }

  const transformedAlgorithms = [];

  for (const key in data) {
    const algorithmObj = {
      id: key,
      ...data[key],
    };

    transformedAlgorithms.push(algorithmObj);
  }

  return transformedAlgorithms;
};

export const getSingleAlgorithm = async (algorithmId) => {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/algorithms/${algorithmId}.json`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quote.");
  }

  const loaedAlgorithm = {
    id: algorithmId,
    ...data,
  };

  return loaedAlgorithm;
};
