import { useHistory } from "react-router-dom";

import useHttp from "../hooks/use-http";
import { signUp } from "../lib/api";
import ErrorModal from "../components/UI/ErrorModal";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import AuthForm from "../components/Auth/AuthForm";

const AuthPage = () => {
  const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
  const history = useHistory();

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

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not login.");
    }

    const { idToken } = data;

    return idToken;
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
