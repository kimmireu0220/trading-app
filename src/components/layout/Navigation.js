import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link, NavLink } from "react-router-dom";

import { authActions } from "../../store/auth";
import classes from "./Navigation.module.css";

const MainNavigation = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [searchedTicker, setSearchedTicker] = useState("");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const tickerChangeHandler = (event) => {
    setSearchedTicker(event.target.value);
  };

  const searchStockHandler = (event) => {
    event.preventDefault();

    history.push(`/trading/${searchedTicker}`);
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <header className={classes.header}>
      <Link className={classes.link} to="/trading">
        <div className={classes.logo}>Trading App</div>
      </Link>
      <form className={classes.search} onSubmit={searchStockHandler}>
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
        {isLoggedIn && (
          <ul>
            <li>
              <NavLink
                to="/algorithms"
                activeClassName={classes.active}
                className={classes.navLink}
              >
                Algorithm
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                activeClassName={classes.active}
                className={classes.navLink}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <Link
                to="/"
                onClick={logoutHandler}
                className={`${classes.navLink} ${classes.logout}`}
              >
                Log out
              </Link>
            </li>
          </ul>
        )}
        {!isLoggedIn && (
          <ul>
            <li>
              <NavLink
                to="/auth"
                activeClassName={classes.active}
                className={classes.navLink}
              >
                Login
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default MainNavigation;
