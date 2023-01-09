import { useState } from "react";
import { useHistory, Link, NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const [searchedTicker, setSearchedTicker] = useState("");
  const history = useHistory();

  const tickerChangeHandler = (event) => {
    setSearchedTicker(event.target.value);
  };

  const searchTickerHandler = (event) => {
    event.preventDefault();

    history.push(`/trading/${searchedTicker}`);
    setSearchedTicker("");
  };

  return (
    <header className={classes.header}>
      <Link className={classes.link} to="/trading">
        <div className={classes.logo}>Trading App</div>
      </Link>
      <form onSubmit={searchTickerHandler}>
        <label htmlFor="ticker" />
        <input
          className={classes.input}
          id="ticker"
          placeholder="Search a ticker"
          onChange={tickerChangeHandler}
          value={searchedTicker}
          autoFocus
        />
        <button>Search</button>
      </form>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/algorithms" activeClassName={classes.active}>
              Algorithm
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
