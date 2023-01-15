import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import classes from "./AuthForm.module.css";

const AuthForm = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [isLoginMode, setIsLoginMode] = useState(true);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLoginMode((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const authData = { email: enteredEmail, password: enteredPassword };

    if (isLoginMode) {
      const token = await props.onSignIn(authData);
      dispatch({ type: "login", token });
      history.push("/");
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
