import { Fragment } from "react";

import AlgorithmItem from "./AlgorithmItem";
import classes from "./AlgorithmItem.module.css";

const AlgorithmList = (props) => {
  const { algorithms } = props;

  return (
    <Fragment>
      <ul className={classes.list}>
        {algorithms.map((algorithm) => (
          <AlgorithmItem
            key={algorithm.id}
            id={algorithm.id}
            title={algorithm.title}
            logic={algorithm.logic}
            description={algorithm.description}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default AlgorithmList;
