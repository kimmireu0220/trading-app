import { Link } from "react-router-dom";

import classes from "./AlgorithmItem.module.css";

const AlgorithmItem = (props) => {
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.title}</p>
        </blockquote>
        <figcaption>
          <p>{`Buy : ${props.buyAlgorithm} $${props.buyTarget} `}</p>
          <p>{`Sell : ${props.sellAlgorithm} $${props.sellTarget} `}</p>
        </figcaption>
      </figure>
      <Link className={classes.detailButton} to={`/algorithms/${props.id}`}>
        View Detail
      </Link>
    </li>
  );
};

export default AlgorithmItem;
