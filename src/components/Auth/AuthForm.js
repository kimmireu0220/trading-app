import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { authActions } from "../../store/auth";
import classes from "./AuthForm.module.css";

const AuthForm = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [isLoginMode, setIsLoginMode] = useState(true);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLoginMode((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const authData = { email, password };

    if (isLoginMode) {
      const { token, expirationTime } = await props.onSignIn(authData);

      dispatch(authActions.login(token));
      pathname === "/auth" ? history.push("/") : history.push(pathname);

      setTimeout(() => {
        dispatch({ type: "logout" });
      }, expirationTime);
    } else {
      props.onSignUp(authData);
      switchAuthModeHandler();
    }
  };

  return (
    <div className="centered">
      <section className={classes.auth}>
        <h1>{isLoginMode ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
          <div className={classes.actions}>
            <button>{isLoginMode ? "Login" : "Create Account"}</button>
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLoginMode
                ? "Create new account"
                : "Login with existing account"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AuthForm;
