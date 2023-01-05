import { Fragment, useContext } from "react";
import { useHistory } from "react-router-dom";

import AlgorithmContext from "../store/algorithm-context";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import AlgorithmList from "../components/Algorithm/AlgorithmList";
import NotFound from "./NotFound";

const AllAlgorithms = () => {
  const algorithmCtx = useContext(AlgorithmContext);
  const { status, algorithms, error } = algorithmCtx;

  const history = useHistory();

  const addAlgorithmHandler = () => {
    history.push("/new-algorithm");
  };

  let content = <AlgorithmList />;

  // Error or Loading status

  if (status === "pending") {
    content = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    content = <p className="centered focused">{error}</p>;
  }

  if (status === "completed" && (!algorithms || algorithms.length === 0)) {
    content = <NotFound text="No algorithm data" />;
  }

  return (
    <Fragment>
      {content}
      <button className="centered btn" onClick={addAlgorithmHandler}>
        Add an Algorithm
      </button>
    </Fragment>
  );
};

export default AllAlgorithms;
