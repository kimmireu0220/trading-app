import React, { createRef, useState } from "react";

import classes from "./AuthForm.module.css";

type Auth = {
  email: string;
  password: string;
};

type Props = {
  onSignUp: (authData: Auth) => any;
  onSignIn: (authData: Auth) => any;
};

const AuthForm: React.FC<Props> = ({ onSignUp, onSignIn }) => {
  const emailInputRef = createRef<HTMLInputElement>();
  const passwordInputRef = createRef<HTMLInputElement>();

  const [isLoginMode, setIsLoginMode] = useState(true);

  const switchAuthModeHandler = () => setIsLoginMode((prevState) => !prevState);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const email = emailInputRef.current!.value;
    const password = passwordInputRef.current!.value;
    const authData = { email, password };

    isLoginMode ? onSignIn(authData) : onSignUp(authData);
  };

  return (
    <div className="centered">
      <section className={classes.auth}>
        <h1>{isLoginMode ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              maxLength={15}
              required
              ref={emailInputRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              minLength={6}
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