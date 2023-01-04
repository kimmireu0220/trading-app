import { Link } from "react-router-dom";

import classes from "./AlgorithmItem.module.css";

const AlgorithmItem = (props) => {
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.title}</p>
        </blockquote>
        <figcaption>{props.logic}</figcaption>
      </figure>
      <Link className={classes.detailButton} to={`/algorithms/${props.id}`}>
        View Detail
      </Link>
    </li>
  );
};

export default AlgorithmItem;
