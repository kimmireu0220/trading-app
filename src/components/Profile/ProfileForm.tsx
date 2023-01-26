import React, { createRef, useState } from "react";
import { useSelector } from "react-redux";

import classes from "./ProfileForm.module.css";

type Auth = {
  token: string;
  password: string;
};

type Props = {
  onUpdatePassword: (authData: Auth) => void;
};

const ProfileForm: React.FC<Props> = ({ onUpdatePassword }) => {
  const newPasswordInputRef = createRef<HTMLInputElement>();
  const confirmPasswordInputRef = createRef<HTMLInputElement>();

  const token = useSelector<{ auth: { token: string } }>(
    (state) => state.auth.token
  ) as string;

  const [formIsInValid, setFormIsInValid] = useState(false);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const password = newPasswordInputRef.current!.value;
    const confirmPassword = confirmPasswordInputRef.current!.value;
    const authData = { token, password };

    if (password === confirmPassword) {
      setFormIsInValid(false);
      onUpdatePassword(authData);
    } else {
      setFormIsInValid(true);
    }
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
          ref={newPasswordInputRef}
        />
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          className={formIsInValid ? classes.invalid : undefined}
          required
          type="password"
          id="confirm-password"
          minLength={6}
          ref={confirmPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
