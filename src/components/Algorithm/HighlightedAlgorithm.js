import { Fragment } from "react";

import classes from "./HighlightedAlgorithm.module.css";

const HighlightedAlgorithm = ({ algorithmConfig }) => {
  const {
    title,
    buyAlgorithm,
    buyTarget,
    sellAlgorithm,
    sellTarget,
    description,
  } = algorithmConfig;

  return (
    <Fragment>
      <h1>{title}</h1>
      <div className={classes.hr}>
        <hr />
      </div>
      <h2>
        <p className={classes.buy}>{`Buy : $${buyTarget} (${buyAlgorithm})`}</p>
        <p
          className={classes.sell}
        >{`Sell : $${sellTarget} (${sellAlgorithm})`}</p>
      </h2>
      <div className={classes.hr}>
        <hr />
      </div>
      <h3>{description}</h3>
      <div className={classes.hr}>
        <hr />
      </div>
    </Fragment>
  );
};

export default HighlightedAlgorithm;
