import React, { Fragment } from "react";

import classes from "./HighlightedAlgorithm.module.css";

import Algorithm from "../../models/algorithm";

type Props = {
  algorithmConfig: Algorithm;
};

const HighlightedAlgorithm: React.FC<Props> = ({ algorithmConfig }) => {
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
      <h1 className={classes.title}>{title}</h1>
      <div className={classes.hr}>
        <hr />
      </div>
      <h2 className={classes.algorithm}>
        <p className={classes.buy}>{`Buy : $${buyTarget} (${buyAlgorithm})`}</p>
        <p
          className={classes.sell}
        >{`Sell : $${sellTarget} (${sellAlgorithm})`}</p>
      </h2>
      <div className={classes.hr}>
        <hr />
      </div>
      <h3 className={classes.description}>{description}</h3>
      <div className={classes.hr}>
        <hr />
      </div>
    </Fragment>
  );
};

export default HighlightedAlgorithm;
