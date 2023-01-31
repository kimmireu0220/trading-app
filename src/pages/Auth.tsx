import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import AuthForm from "../components/Auth/AuthForm";
import ErrorModal from "../components/UI/ErrorModal";
import LoadingSpinner from "../components/UI/LoadingSpinner";

import useHttp from "../hooks/use-http";
import { signUp, signIn } from "../lib/api";
import { authActions } from "../store/auth";

import LoginAuth from "../models/login-auth";

const AuthPage = () => {
  const navigate = useNavigate();
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

  const signUpHandler = (authData: LoginAuth) => userSignUp(authData);

  const signInHandler = (authData: LoginAuth) => userSignIn(authData);

  const goToAuthPage = () => {
    navigate("/auth");
    window.location.reload();
  };

  useEffect(() => {
    if (userData) {
      const { token, email, expirationTime } = userData;
      dispatch(authActions.login({ token, email }));
      navigate("/trading");

      setTimeout(() => {
        dispatch(authActions.logout());
      }, expirationTime);
    }
  }, [userData, pathname, dispatch, navigate]);

  if (signUpError || signInError)
    return (
      <ErrorModal
        title={"Authentification Error"}
        message={signUpError ? signUpError : signInError}
        onConfirm={goToAuthPage}
      />
    );

  if (signUpStatus === "pending" || signInStatus === "pending")
    return <LoadingSpinner />;

  return <AuthForm onSignUp={signUpHandler} onSignIn={signInHandler} />;
};

export default AuthPage;
