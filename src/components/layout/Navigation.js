import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NavLinks from "./NavLinks";
import SearchForm from "./SearchForm";

import { authActions } from "../../store/auth";

import classes from "./Navigation.module.css";

const MainNavigation = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const [iconAnimation, setIconAnimation] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const logoutHandler = () => dispatch(authActions.logout());

  const goToHomeHandler = () => history.push("/");

  const goToAuthHandler = () => history.push("/auth");

  const toggleMenuHandler = () => {
    setShowMenu((prevState) => !prevState);

    setIconAnimation(true);
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <button className={classes.logo} onClick={goToHomeHandler}>
          Trading App
        </button>
        <SearchForm />
        <NavLinks size="normal" />
        <div className={classes.smallMenu}>
          <button
            onClick={isLoggedIn ? logoutHandler : goToAuthHandler}
            className={classes.auth}
          >
            {isLoggedIn ? "Log out" : "Log in"}
          </button>
          {isLoggedIn && !showMenu && (
            <div
              className={
                iconAnimation
                  ? `${classes.icon} ${classes.iconAnimation}`
                  : classes.icon
              }
              onClick={toggleMenuHandler}
            >
              <FontAwesomeIcon icon={faBars} />
            </div>
          )}
          {isLoggedIn && showMenu && (
            <div
              className={
                iconAnimation
                  ? `${classes.icon} ${classes.iconAnimation}`
                  : classes.icon
              }
              onClick={toggleMenuHandler}
            >
              <FontAwesomeIcon icon={faXmark} size="lg" />
            </div>
          )}
        </div>
      </header>
      {showMenu && <NavLinks onToggle={toggleMenuHandler} size="small" />}
    </Fragment>
  );
};

export default MainNavigation;
