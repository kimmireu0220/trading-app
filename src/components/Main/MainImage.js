import classes from "./MainImage.module.css";
import background from "../../assets/background.jpeg";

const MainImage = () => {
  return (
    <div className={classes["main-image"]}>
      <img src={background} alt="background" />
    </div>
  );
};

export default MainImage;
