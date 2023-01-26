import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { authActions } from "../../store/auth";

import classes from "./NavLinks.module.css";

const NavLinks: React.FC<{ size: string; onToggle: () => void }> = (props) => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector<{ auth: { isLoggedIn: boolean } }>(
    (state) => state.auth.isLoggedIn
  ) as boolean;

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
              className={(navData) => {
                return navData.isActive
                  ? `${classes.active} ${classes.navLink}`
                  : classes.navLink;
              }}
            >
              Algorithm
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={props.onToggle}
              to="/profile"
              className={(navData) => {
                return navData.isActive
                  ? `${classes.active} ${classes.navLink}`
                  : classes.navLink;
              }}
            >
              Profile
            </NavLink>
          </li>
          {props.size === "normal" && (
            <li>
              <Link
                to="/trading"
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
              className={(navData) => {
                return navData.isActive
                  ? `${classes.active} ${classes.navLink}`
                  : classes.navLink;
              }}
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
