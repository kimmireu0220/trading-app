import { useHistory } from "react-router-dom";

import { signUp } from "../lib/api";
import useHttp from "../hooks/use-http";
import AuthForm from "../components/Auth/AuthForm";
import ErrorModal from "../components/UI/ErrorModal";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const AuthPage = () => {
  const history = useHistory();

  const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
  const FIREBASE_AUTHENTIFICATION_DOMAIN =
    process.env.REACT_APP_FIREBASE_AUTHENTIFICATION_DOMAIN;

  const {
    sendRequest: userSignUp,
    status: signUpStatus,
    error: signUpError,
  } = useHttp(signUp);

  const signUpHandler = (authData) => {
    userSignUp(authData);
  };

  const signInHandler = async (authData) => {
    const { email, password } = authData;

    const FIREBASE_SIGNIN_API = `${FIREBASE_AUTHENTIFICATION_DOMAIN}signInWithPassword?key=${FIREBASE_API_KEY}`;
    const response = await fetch(FIREBASE_SIGNIN_API, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not login.");
    }

    const result = {
      token: data.idToken,
      expirationTime: +data.expiresIn * 1000,
    };

    return result;
  };

  const goToAuthPage = () => {
    history.push("/auth");
    window.location.reload();
  };

  if (signUpError) {
    return (
      <ErrorModal
        title={"Authentification Error"}
        message={signUpError}
        onConfirm={goToAuthPage}
      />
    );
  }

  if (signUpStatus === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  return <AuthForm onSignUp={signUpHandler} onSignIn={signInHandler} />;
};

export default AuthPage;
