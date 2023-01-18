import classes from "./MainBackgroundImage.module.css";
import backgroundImg from "../../assets/main-page-background.jpeg";

const MainBackgroundImage = () => {
  return (
    <div className={classes.image}>
      <img src={backgroundImg} alt="background-img" />
    </div>
  );
};

export default MainBackgroundImage;
