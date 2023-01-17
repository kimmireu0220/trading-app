import ProfileForm from "./ProfileForm";
import useHttp from "../../hooks/use-http";
import { updatePassword } from "../../lib/api";
import classes from "./UserProfile.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { sendRequest, status } = useHttp(updatePassword);

  const updatePasswordHandler = (authData) => {
    sendRequest(authData);
  };

  useEffect(() => {
    if (status === "completed") {
      dispatch(authActions.logout());
    }
  }, [status, dispatch]);

  if (status === "pending") {
    return <LoadingSpinner />;
  }

  return (
    <section className={classes.profile}>
      <h1>User Profile</h1>
      <ProfileForm onUpdatePassword={updatePasswordHandler} />
    </section>
  );
};

export default UserProfile;
