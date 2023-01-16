import { useLocation, Link } from "react-router-dom";

import classes from "./AlgorithmItem.module.css";

const AlgorithmItem = ({ algorithmConfig }) => {
  const { pathname } = useLocation();

  const { title, buyAlgorithm, buyTarget, sellAlgorithm, sellTarget, id } =
    algorithmConfig;

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
      <Link className={classes.link} to={`${pathname}/${id}`}>
        View Detail
      </Link>
    </li>
  );
};

export default AlgorithmItem;
