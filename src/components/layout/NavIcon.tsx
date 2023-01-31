import { Fragment } from "react";

import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "./NavIcon.module.css";

type Props = {
  isLoggedIn: boolean;
  showMenu: boolean;
  toggleMenuHandler: () => void;
};

const NavIcon: React.FC<Props> = (props) => {
  const { isLoggedIn, showMenu, toggleMenuHandler } = props;

  return (
    <Fragment>
      {isLoggedIn && showMenu && (
        <div
          className={`${classes.icon} ${classes.iconAnimation}`}
          onClick={toggleMenuHandler}
        >
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </div>
      )}
      {isLoggedIn && !showMenu && (
        <div
          className={`${classes.icon} ${classes.iconAnimation}`}
          onClick={toggleMenuHandler}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
      )}
    </Fragment>
  );
};

export default NavIcon;
