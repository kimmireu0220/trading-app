import React, { useState } from "react";
import { useNavigate } from "react-router";

import classes from "./SearchForm.module.css";

const SearchForm = () => {
  const navigate = useNavigate();

  const [searchedTicker, setSearchedTicker] = useState("");

  const tickerChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchedTicker(event.target.value);

  const searchStockHandler = (event: React.FormEvent) => {
    event.preventDefault();

    navigate(`/trading/${searchedTicker}`);
  };

  return (
    <form className={classes.form} onSubmit={searchStockHandler}>
      <label htmlFor="ticker" />
      <input
        className={classes.input}
        id="ticker"
        placeholder="Search a ticker"
        onChange={tickerChangeHandler}
        value={searchedTicker}
        autoFocus
      />
      <button className={classes.search}>Search</button>
    </form>
  );
};

export default SearchForm;
