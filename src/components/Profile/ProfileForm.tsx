import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import PasswordAuth from "../../models/password-auth";

import classes from "./ProfileForm.module.css";

type Props = {
  onUpdatePassword: (authData: PasswordAuth) => void;
};

const ProfileForm: React.FC<Props> = ({ onUpdatePassword }) => {
  const [formIsInValid, setFormIsInValid] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmNewPassword] = useState("");

  const token = useSelector<{ auth: { token: string } }>(
    (state) => state.auth.token
  ) as string;

  const newPasswordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword(event.target.value);
  };

  const confirmPasswordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmNewPassword(event.target.value);
  };

  useEffect(() => {
    setFormIsInValid(newPassword !== confirmPassword);
  }, [newPassword, confirmPassword]);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const authData = { token, password: newPassword };

    if (newPassword === confirmPassword && newPassword.length >= 6) {
      setFormIsInValid(false);
      onUpdatePassword(authData);
    } else setFormIsInValid(true);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          required
          type="password"
          id="new-password"
          minLength={6}
          value={newPassword}
          onChange={newPasswordChangeHandler}
        />
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          className={formIsInValid ? classes.invalid : undefined}
          required
          type="password"
          id="confirm-password"
          minLength={6}
          value={confirmPassword}
          onChange={confirmPasswordChangeHandler}
        />
      </div>
      {formIsInValid && (
        <p className={classes.warning}>
          Password fields mismatch or less than 6 characters.
        </p>
      )}
      <div className={classes.action}>
        <button className={classes.change} disabled={formIsInValid}>
          Change Password
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
