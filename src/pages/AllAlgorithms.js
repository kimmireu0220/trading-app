import { useContext, Fragment } from "react";
import { useHistory } from "react-router-dom";

import AlgorithmContext from "../store/algorithm-context";
import AlgorithmList from "../components/Algorithm/AlgorithmList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NotFound from "./NotFound";

const AllAlgorithms = () => {
  const { algorithms, status, error } = useContext(AlgorithmContext);
  const history = useHistory();

  const goToAddAlgorithmPageHandler = () => {
    history.push("/add-algorithm");
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
      <div className="mb-3">{content}</div>
      <button className="centered btn" onClick={goToAddAlgorithmPageHandler}>
        Add an Algorithm
      </button>
    </Fragment>
  );
};

export default AllAlgorithms;
