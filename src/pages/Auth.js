import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import useHttp from "../hooks/use-http";
import { authActions } from "../store/auth";
import { signUp, signIn } from "../lib/api";
import AuthForm from "../components/Auth/AuthForm";
import ErrorModal from "../components/UI/ErrorModal";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const AuthPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const {
    sendRequest: userSignUp,
    status: signUpStatus,
    error: signUpError,
  } = useHttp(signUp);

  const {
    sendRequest: userSignIn,
    status: signInStatus,
    error: signInError,
    data: userData,
  } = useHttp(signIn);

  const signUpHandler = (authData) => {
    userSignUp(authData);
  };

  const signInHandler = (authData) => {
    userSignIn(authData);
  };

  const goToAuthPage = () => {
    history.push("/auth");
    window.location.reload();
  };

  useEffect(() => {
    if (userData) {
      const { token, expirationTime } = userData;
      dispatch(authActions.login(token));
      pathname === "/auth" ? history.push("/") : history.push(pathname);

      setTimeout(() => {
        dispatch(authActions.logout());
      }, expirationTime);
    }
  }, [userData, history, pathname, dispatch]);

  // Error or Loading status

  if (signUpError || signInError) {
    return (
      <ErrorModal
        title={"Authentification Error"}
        message={signUpError ? signUpError : signInError}
        onConfirm={goToAuthPage}
      />
    );
  }

  if (signUpStatus === "pending" || signInStatus === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <AuthForm
      onSignUp={signUpHandler}
      onSignIn={signInHandler}
      userData={userData}
    />
  );
};

export default AuthPage;
