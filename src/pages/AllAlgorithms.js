import { Fragment, useEffect } from "react";

import AlgorithmList from "../components/Algorithm/AlgorithmList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NotFound from "./NotFound";
import useHttp from "../hooks/use-http";
import { getAllAlgorithms } from "../lib/api";
import { useHistory } from "react-router-dom";

const AllAlgorithms = () => {
  const history = useHistory();

  const addAlgorithmHandler = () => {
    history.push("/new-algorithm");
  };

  const {
    sendRequest,
    status,
    data: loadedAlgorithms,
    error,
  } = useHttp(getAllAlgorithms, true);

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
    return <NotFound text="Can't find algorithm data" />;
  }

  return (
    <Fragment>
      <AlgorithmList algorithms={loadedAlgorithms} />
      <button className="centered btn" onClick={addAlgorithmHandler}>
        Add an Algorithm
      </button>
    </Fragment>
  );
};

export default AllAlgorithms;
