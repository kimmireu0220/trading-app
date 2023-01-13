import { useState } from "react";
import { useHistory, Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.isLogin);

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

  const logoutHandler = () => {
    dispatch({ type: "logout" });
  };

  return (
    <header className={classes.header}>
      <Link className={classes.link} to="/trading">
        <div className={classes.logo}>Trading App</div>
      </Link>
      <form className={classes.search} onSubmit={searchTickerHandler}>
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
          {isLogin && (
            <div>
              <li>
                <NavLink
                  to="/algorithms"
                  className={classes.navLink}
                  activeClassName={classes.active}
                >
                  Algorithm
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className={classes.navLink}
                  activeClassName={classes.active}
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/logout"
                  onClick={logoutHandler}
                  className={classes.navLink}
                  activeClassName={classes.active}
                >
                  Log out
                </NavLink>
              </li>
            </div>
          )}
          {!isLogin && (
            <div>
              <li>
                <NavLink
                  to="/auth"
                  className={classes.navLink}
                  activeClassName={classes.active}
                >
                  Login
                </NavLink>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
