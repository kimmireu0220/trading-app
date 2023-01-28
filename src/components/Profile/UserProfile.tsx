import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import ProfileForm from "./ProfileForm";
import LoadingSpinner from "../UI/LoadingSpinner";

import useHttp from "../../hooks/use-http";
import { updatePassword } from "../../lib/api";
import { authActions } from "../../store/auth";
import PasswordAuth from "../../models/password-auth";

import classes from "./UserProfile.module.css";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { sendRequest, status } = useHttp(updatePassword);

  const updatePasswordHandler = (authData: PasswordAuth) =>
    sendRequest(authData);

  useEffect(() => {
    if (status === "completed") dispatch(authActions.logout());
  }, [status, dispatch]);

  return (
    <Fragment>
      <section className={classes.profile}>
        <h1>User Profile</h1>
        <ProfileForm onUpdatePassword={updatePasswordHandler} />
      </section>
      {status === "pending" && <LoadingSpinner />}
    </Fragment>
  );
};

export default UserProfile;
