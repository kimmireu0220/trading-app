import { useLocation, Link } from "react-router-dom";

import classes from "./AlgorithmItem.module.css";

const AlgorithmItem = (props) => {
  const { pathname } = useLocation();

  const { title, buyAlgorithm, buyTarget, sellAlgorithm, sellTarget, id } =
    props;

  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{title}</p>
        </blockquote>
        <figcaption>
          <p>{`Buy : ${buyAlgorithm} $${buyTarget} `}</p>
          <p>{`Sell : ${sellAlgorithm} $${sellTarget} `}</p>
        </figcaption>
      </figure>
      <Link className={classes.link} to={`${pathname}/${id}`}>
        View Detail
      </Link>
    </li>
  );
};

export default AlgorithmItem;
