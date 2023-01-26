import { useEffect } from "react";
import { useDispatch } from "react-redux";

import ProfileForm from "./ProfileForm";
import LoadingSpinner from "../UI/LoadingSpinner";

import useHttp from "../../hooks/use-http";
import { updatePassword } from "../../lib/api";
import { authActions } from "../../store/auth";

import classes from "./UserProfile.module.css";

type Auth = {
  token: string;
  password: string;
};

const UserProfile = () => {
  const dispatch = useDispatch();

  const { sendRequest, status } = useHttp(updatePassword);

  const updatePasswordHandler = (authData: Auth) => sendRequest(authData);

  useEffect(() => {
    if (status === "completed") dispatch(authActions.logout());
  }, [status, dispatch]);

  if (status === "pending") return <LoadingSpinner />;

  return (
    <section className={classes.profile}>
      <h1>User Profile</h1>
      <ProfileForm onUpdatePassword={updatePasswordHandler} />
    </section>
  );
};

export default UserProfile;
