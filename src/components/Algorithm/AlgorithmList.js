import { useEffect } from "react";

import AlgorithmItem from "./AlgorithmItem";
import LoadingSpinner from "../UI/LoadingSpinner";

import useHttp from "../../hooks/use-http";
import { getAllAlgorithms } from "../../lib/api";

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
      {loadedAlgorithms.map((algorithm) => {
        const {
          id,
          title,
          buyAlgorithm,
          buyTarget,
          sellAlgorithm,
          sellTarget,
          description,
        } = algorithm;

        return (
          <AlgorithmItem
            key={id}
            algorithmConfig={{
              id,
              title,
              buyAlgorithm,
              buyTarget,
              sellAlgorithm,
              sellTarget,
              description,
            }}
          />
        );
      })}
    </ul>
  );
};

export default AlgorithmList;
