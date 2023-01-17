import { useEffect, Fragment } from "react";

import useHttp from "../../hooks/use-http";
import AlgorithmItem from "./AlgorithmItem";
import { getAllAlgorithms } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

const AlgorithmList = () => {
  const {
    sendRequest,
    status,
    data: algorithms,
    error,
  } = useHttp(getAllAlgorithms, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  return (
    <Fragment>
      <ul>
        {algorithms.map((algorithm) => (
          <AlgorithmItem
            key={algorithm.id}
            algorithmConfig={{
              id: algorithm.id,
              title: algorithm.title,
              buyAlgorithm: algorithm.buyAlgorithm,
              buyTarget: algorithm.buyTarget,
              sellAlgorithm: algorithm.sellAlgorithm,
              sellTarget: algorithm.sellTarget,
              description: algorithm.description,
            }}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default AlgorithmList;
