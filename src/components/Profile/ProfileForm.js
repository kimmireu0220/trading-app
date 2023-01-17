import { useRef, useState } from "react";
import { useSelector } from "react-redux";

import classes from "./ProfileForm.module.css";

const ProfileForm = (props) => {
  const newPasswordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const [formIsInValid, setFormIsInValid] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const submitHandler = (event) => {
    event.preventDefault();

    const password = newPasswordInputRef.current.value;
    const confirmPassword = confirmPasswordInputRef.current.value;
    const authData = { token, password };

    if (password === confirmPassword) {
      setFormIsInValid(false);
      props.onUpdatePassword(authData);
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
          minLength="6"
          ref={newPasswordInputRef}
        />
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          className={formIsInValid ? classes.invalid : ""}
          required
          type="password"
          id="confirm-password"
          minLength="6"
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
