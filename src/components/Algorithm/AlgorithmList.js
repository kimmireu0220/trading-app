import { useEffect } from "react";

import useHttp from "../../hooks/use-http";
import { getAllAlgorithms } from "../../lib/api";

import AlgorithmItem from "./AlgorithmItem";
import NotFound from "../../pages/NotFound";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./AlgorithmList.module.css";

const AlgorithmList = () => {
  const {
    sendRequest,
    data: loadedAlgorithms,
    status,
    error,
  } = useHttp(getAllAlgorithms);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (
    status === "completed" &&
    (!loadedAlgorithms || loadedAlgorithms.length === 0)
  ) {
    return <NotFound text="Can't find algorithm data." />;
  }

  return (
    <ul className={classes.list}>
      {loadedAlgorithms &&
        loadedAlgorithms.map((algorithm) => (
          <AlgorithmItem
            key={algorithm.id}
            title={algorithm.title}
            logic={algorithm.logic}
            description={algorithm.description}
          />
        ))}
    </ul>
  );
};

export default AlgorithmList;
