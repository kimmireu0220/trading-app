import { useHistory } from "react-router-dom";

import classes from "./AlgorithmItem.module.css";

const AlgorithmItem = ({ algorithmConfig }) => {
  const history = useHistory();
  const { title, buyAlgorithm, buyTarget, sellAlgorithm, sellTarget, id } =
    algorithmConfig;

  const goToDetailPageHandler = () => {
    history.push(`algorithms/${id}`);
  };

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
      <button className={classes.link} onClick={goToDetailPageHandler}>
        View Detail
      </button>
    </li>
  );
};

export default AlgorithmItem;
