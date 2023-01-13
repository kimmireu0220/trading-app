import useHttp from "../hooks/use-http";
import { signUp } from "../lib/api";

import ErrorModal from "../components/UI/ErrorModal";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import AuthForm from "../components/Auth/AuthForm";
import { useHistory } from "react-router-dom";

const AuthPage = () => {
  const history = useHistory();

  const { sendRequest, status, error } = useHttp(signUp);

  const signUpHandler = (authData) => {
    sendRequest(authData);
  };

  const goToAuthPage = () => {
    history.push("/auth");
    window.location.reload();
  };

  if (error) {
    return (
      <ErrorModal
        title="Authentification Error"
        message={error}
        onConfirm={goToAuthPage}
      />
    );
  }

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  return <AuthForm onSignUp={signUpHandler} />;
};

export default AuthPage;
