import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import classes from "./NavLinks.module.css";
import { authActions } from "../../store/auth";

const NavLinks = (props) => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <nav className={props.size === "normal" ? classes.nav : classes.smallNav}>
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
  );
};

export default NavLinks;
