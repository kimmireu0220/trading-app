import ProfileForm from "./ProfileForm";
import useHttp from "../../hooks/use-http";
import { updatePassword } from "../../lib/api";
import classes from "./UserProfile.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";

const UserProfile = () => {
  const { sendRequest, status } = useHttp(updatePassword);

  const updatePasswordHandler = (authData) => {
    sendRequest(authData);
  };

  if (status === "pending") {
    return <LoadingSpinner />;
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onUpdatePassword={updatePasswordHandler} />
    </section>
  );
};

export default UserProfile;
