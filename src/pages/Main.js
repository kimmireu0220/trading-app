import { Fragment } from "react";

import MainBackgroundImage from "../components/Main/MainBackgroundImage";

const Main = () => {
  return (
    <Fragment>
      <MainBackgroundImage />
      <h1 className="centered no--wrap">
        Trade stocks with your own Algorithms
      </h1>
    </Fragment>
  );
};

export default Main;
