const ALPHA_VANTAGE_DOMAIN = process.env.REACT_APP_ALPHA_VANTAGE_DOMAIN;
const ALPHA_VANTAGE_API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
const FIREBASE_DB_DOMAIN = process.env.REACT_APP_FIREBASE_DB_DOMAIN;
const FIREBASE_AUTHENTIFICATION_DOMAIN =
  process.env.REACT_APP_FIREBASE_AUTHENTIFICATION_DOMAIN;
const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

export const getStockDetailData = async (ticker) => {
  const ALPHA_VANTAGE_OVERVIEW_API = `${ALPHA_VANTAGE_DOMAIN}/query?function=OVERVIEW&symbol=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`;
  const response = await fetch(ALPHA_VANTAGE_OVERVIEW_API);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not get today stock data");
  }

  const result = {
    name: data["Name"],
  };

  return result;
};

export const getTodayStockData = async (ticker) => {
  const ALPHA_VANTAGE_GLOBAL_QUOTE_API = `${ALPHA_VANTAGE_DOMAIN}/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`;
  const response = await fetch(ALPHA_VANTAGE_GLOBAL_QUOTE_API);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not get today stock data");
  }

  const result = {
    price: +data["Global Quote"]["05. price"],
    change: +data["Global Quote"]["10. change percent"].slice(0, -1),
  };

  return result;
};

export const getDailyStockData = async (ticker) => {
  const ALPHA_VANTAGE_TIME_SERIES_DAILY_ADJUSTED_API = `${ALPHA_VANTAGE_DOMAIN}/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&outputsize=compact&apikey=${ALPHA_VANTAGE_API_KEY}`;
  const response = await fetch(ALPHA_VANTAGE_TIME_SERIES_DAILY_ADJUSTED_API);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not get daily stock data");
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
  const FIREBASE_ADD_API_ALGORITHM = `${FIREBASE_DB_DOMAIN}/algorithms.json`;
  const response = await fetch(FIREBASE_ADD_API_ALGORITHM, {
    method: "POST",
    body: JSON.stringify(algorithmData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create algorithm");
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

  const FIREBASE_EDIT_ALGORITHM_API = `${FIREBASE_DB_DOMAIN}/algorithms/${algorithmId}.json`;
  const response = await fetch(FIREBASE_EDIT_ALGORITHM_API, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not edit algorithm");
  }

  return null;
};

export const deleteAlgorithm = async (algorithmId) => {
  const FIREBASE_DELETE_ALGORITHM_API = `${FIREBASE_DB_DOMAIN}/algorithms/${algorithmId}.json`;
  const response = await fetch(FIREBASE_DELETE_ALGORITHM_API, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not delete algorithm");
  }

  return null;
};

export const getAllAlgorithms = async () => {
  const FIREBASE_ALL_ALGORITHMS_API = `${FIREBASE_DB_DOMAIN}/algorithms.json`;
  const response = await fetch(FIREBASE_ALL_ALGORITHMS_API);
  const data = await response.json();

  if (!data.test_id_1 && !response.ok) {
    throw new Error(data.message || "Could not fetch algorithms");
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
  const FIREBASE_SINGLE_ALGORITHM_API = `${FIREBASE_DB_DOMAIN}/algorithms/${algorithmId}.json`;
  const response = await fetch(FIREBASE_SINGLE_ALGORITHM_API);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch single algorithm data");
  }

  const loaedAlgorithm = {
    id: algorithmId,
    ...data,
  };

  return loaedAlgorithm;
};

export const signUp = async (authData) => {
  const FIREBASE_SIGNUP_API = `${FIREBASE_AUTHENTIFICATION_DOMAIN}signUp?key=${FIREBASE_API_KEY}`;
  const response = await fetch(FIREBASE_SIGNUP_API, {
    method: "POST",
    body: JSON.stringify({
      email: authData.email,
      password: authData.password,
      returnSecureToken: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to sign up");
  }

  return null;
};

export const signIn = async (authData) => {
  const { email, password } = authData;

  const FIREBASE_SIGNIN_API = `${FIREBASE_AUTHENTIFICATION_DOMAIN}signInWithPassword?key=${FIREBASE_API_KEY}`;
  const response = await fetch(FIREBASE_SIGNIN_API, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to sign in");
  }

  const result = {
    token: data.idToken,
    expirationTime: +data.expiresIn * 1000,
  };

  return result;
};

export const updatePassword = async (authData) => {
  const FIREBASE_UPDATE_PASSWORD_API = `${FIREBASE_AUTHENTIFICATION_DOMAIN}update?key=${FIREBASE_API_KEY}`;
  const response = await fetch(FIREBASE_UPDATE_PASSWORD_API, {
    method: "POST",
    body: JSON.stringify({
      idToken: authData.token,
      password: authData.password,
      returnSecureToken: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not update password");
  }

  return null;
};
