import { useContext, Fragment } from "react";
import { useHistory } from "react-router-dom";

import NotFound from "./NotFound";
import AlgorithmContext from "../store/algorithm-context";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import AlgorithmList from "../components/Algorithm/AlgorithmList";

const AllAlgorithms = () => {
  const { algorithms, status, error } = useContext(AlgorithmContext);
  const history = useHistory();

  const goToAddAlgorithmPageHandler = () => {
    history.push("/add-algorithm");
  };

  let content = <AlgorithmList />;

  if (status === "pending") {
    content = <LoadingSpinner />;
  }

  if (error) {
    content = <p className="centered focused">{error}</p>;
  }

  if (status === "completed" && (!algorithms || algorithms.length === 0)) {
    content = <NotFound text="No algorithm data" />;
  }

  return (
    <Fragment>
      <div className="mb-3">{content}</div>
      <button className="centered btn" onClick={goToAddAlgorithmPageHandler}>
        Add an Algorithm
      </button>
    </Fragment>
  );
};

export default AllAlgorithms;
