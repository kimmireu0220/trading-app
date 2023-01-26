import { useEffect } from "react";

import AlgorithmItem from "./AlgorithmItem";
import LoadingSpinner from "../UI/LoadingSpinner";

import useHttp from "../../hooks/use-http";
import { getAllAlgorithms } from "../../lib/api";
import Algorithm from "../../models/algorithm";

const AlgorithmList = () => {
  const {
    sendRequest,
    status,
    data: loadedAlgorithms,
    error,
  } = useHttp(getAllAlgorithms, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") return <LoadingSpinner />;
  if (error) return <p className="centered mb-3">{error}</p>;
  if (loadedAlgorithms.length === 0)
    return <p className="centered mb-3">There is no algoritm! Add it!</p>;

  return (
    <ul>
      {loadedAlgorithms.map((algorithm: Algorithm) => {
        const {
          title,
          buyAlgorithm,
          buyTarget,
          sellAlgorithm,
          sellTarget,
          description,
          algorithmId,
        } = algorithm;

        return (
          <AlgorithmItem
            key={algorithmId}
            algorithmConfig={{
              title,
              buyAlgorithm,
              buyTarget,
              sellAlgorithm,
              sellTarget,
              description,
              algorithmId,
            }}
          />
        );
      })}
    </ul>
  );
};

export default AlgorithmList;
