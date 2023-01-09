import { useContext, Fragment } from "react";

import classes from "./AlgorithmItem.module.css";
import AlgorithmContext from "../../store/algorithm-context";
import AlgorithmItem from "./AlgorithmItem";

const AlgorithmList = () => {
  const { algorithms } = useContext(AlgorithmContext);

  return (
    <Fragment>
      <ul className={classes.list}>
        {algorithms.map((algorithm) => (
          <AlgorithmItem
            key={algorithm.id}
            id={algorithm.id}
            title={algorithm.title}
            buyAlgorithm={algorithm.buyAlgorithm}
            buyTarget={algorithm.buyTarget}
            sellAlgorithm={algorithm.sellAlgorithm}
            sellTarget={algorithm.sellTarget}
            description={algorithm.description}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default AlgorithmList;
