import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { authActions } from "../../store/auth";
import classes from "./ProfileForm.module.css";

const ProfileForm = (props) => {
  const dispatch = useDispatch();
  const newPasswordInputRef = useRef();
  const token = useSelector((state) => state.token);

  const submitHandler = (event) => {
    event.preventDefault();

    const password = newPasswordInputRef.current.value;
    const authData = { token, password };
    props.onUpdatePassword(authData);

    dispatch(authActions.logout());
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="6"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
