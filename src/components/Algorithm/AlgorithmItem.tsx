import React from "react";
import { Link } from "react-router-dom";

import classes from "./AlgorithmItem.module.css";

import Algorithm from "../../models/algorithm";

type Props = { algorithmConfig: Algorithm };

const AlgorithmItem: React.FC<Props> = ({ algorithmConfig }) => {
  const {
    title,
    buyAlgorithm,
    buyTarget,
    sellAlgorithm,
    sellTarget,
    algorithmId,
  } = algorithmConfig;

  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p className={classes.title}>{title}</p>
        </blockquote>
        <figcaption>
          <p
            className={classes.buy}
          >{`Buy : ${buyAlgorithm} $${buyTarget} `}</p>
          <p
            className={classes.sell}
          >{`Sell : ${sellAlgorithm} $${sellTarget} `}</p>
        </figcaption>
      </figure>
      <Link className={classes.link} to={`/algorithms/${algorithmId}`}>
        View Detail
      </Link>
    </li>
  );
};

export default AlgorithmItem;
