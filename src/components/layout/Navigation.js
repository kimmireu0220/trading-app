import { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NavLinks from "./NavLinks";
import SearchForm from "./SearchForm";
import classes from "./Navigation.module.css";

const MainNavigation = () => {
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenuHandler = () => {
    setShowMenu((prevState) => !prevState);
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <Link className={classes.link} to="/trading">
          <div className={classes.logo}>Trading App</div>
        </Link>
        <SearchForm history={history} />
        <NavLinks mode="normal" />
        {showMenu && (
          <div className={classes.burger} onClick={toggleMenuHandler}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        )}
        {!showMenu && (
          <div className={classes.burger} onClick={toggleMenuHandler}>
            <FontAwesomeIcon icon={faBars} />
          </div>
        )}
      </header>
      {showMenu && <NavLinks mode="small" />}
    </Fragment>
  );
};

export default MainNavigation;
