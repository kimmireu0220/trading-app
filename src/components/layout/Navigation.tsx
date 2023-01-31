import { Fragment, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import NavIcon from "./NavIcon";
import NavLinks from "./NavLinks";
import SearchForm from "./SearchForm";

import { authActions } from "../../store/auth";

import classes from "./Navigation.module.css";

const MainNavigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);

  const isLoggedIn = useSelector<{ auth: { isLoggedIn: boolean } }>(
    (state) => state.auth.isLoggedIn
  ) as boolean;

  const logoutHandler = () => dispatch(authActions.logout());

  const goToHomeHandler = () => navigate("/trading");

  const goToAuthHandler = () => navigate("/auth");

  const toggleMenuHandler = () => setShowMenu((prevState) => !prevState);

  return (
    <Fragment>
      <header className={classes.header}>
        <button className={classes.logo} onClick={goToHomeHandler}>
          Trading App
        </button>
        <SearchForm />
        <NavLinks onToggle={() => {}} size="normal" />
        <div className={classes.smallMenu}>
          <button
            onClick={isLoggedIn ? logoutHandler : goToAuthHandler}
            className={classes.auth}
          >
            {isLoggedIn ? "Log out" : "Log in"}
          </button>
          <NavIcon
            isLoggedIn={isLoggedIn}
            showMenu={showMenu}
            toggleMenuHandler={toggleMenuHandler}
          />
        </div>
      </header>
      {showMenu && <NavLinks onToggle={toggleMenuHandler} size="small" />}
    </Fragment>
  );
};

export default MainNavigation;
