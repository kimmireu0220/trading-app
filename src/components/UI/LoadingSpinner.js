import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className="centered">
      <div className={classes.spinner} />
    </div>
  );
};

export default LoadingSpinner;
