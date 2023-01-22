import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { authActions } from "../../store/auth";

import classes from "./NavLinks.module.css";

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
              onClick={props.onToggle}
              to="/algorithms"
              activeClassName={classes.active}
              className={classes.navLink}
            >
              Algorithm
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={props.onToggle}
              to="/profile"
              activeClassName={classes.active}
              className={classes.navLink}
            >
              Profile
            </NavLink>
          </li>
          {props.size === "normal" && (
            <li>
              <Link
                to="/"
                onClick={logoutHandler}
                className={`${classes.navLink} ${classes.logout}`}
              >
                Log out
              </Link>
            </li>
          )}
        </ul>
      )}
      {!isLoggedIn && props.size === "normal" && (
        <ul>
          <li>
            <NavLink
              onClick={props.onToggle}
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
