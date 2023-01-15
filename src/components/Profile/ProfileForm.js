import { useRef } from "react";
import { useSelector } from "react-redux";
import classes from "./ProfileForm.module.css";

const ProfileForm = (props) => {
  const token = useSelector((state) => state.token);
  const newPasswordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const password = newPasswordInputRef.current.value;
    const authData = { token, password };
    props.onUpdatePassword(authData);

    newPasswordInputRef.current.value = "";
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
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
