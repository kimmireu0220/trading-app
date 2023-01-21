import { useState } from "react";

import classes from "./SearchForm.module.css";

const SearchForm = (props) => {
  const [searchedTicker, setSearchedTicker] = useState("");

  const tickerChangeHandler = (event) => setSearchedTicker(event.target.value);

  const searchStockHandler = (event) => {
    event.preventDefault();

    props.history.push(`/trading/${searchedTicker}`);
  };

  return (
    <form onSubmit={searchStockHandler}>
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
