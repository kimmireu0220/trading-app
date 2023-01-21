import classes from "./MainTitle.module.css";

const MainTitle = () => {
  return (
    <h1 className={classes.title}>
      <p className={classes.first}>Trade stocks</p>
      <p className={classes.second}>with</p>
      <p className={classes.third}>your Algorithms</p>
    </h1>
  );
};

export default MainTitle;
