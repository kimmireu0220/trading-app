import { Fragment } from "react";

import MainImage from "../components/Main/MainImage";

const Main = () => {
  return (
    <Fragment>
      <MainImage />
      <h1 className="centered no--wrap">
        Trade stocks with your own Algorithms
      </h1>
    </Fragment>
  );
};

export default Main;
