import { Fragment } from "react";
import { useHistory } from "react-router-dom";

import AlgorithmList from "../components/Algorithm/AlgorithmList";

const AllAlgorithms = () => {
  const history = useHistory();

  const goToAddAlgorithmPageHandler = () => {
    history.push("/add-algorithm");
  };

  return (
    <Fragment>
      <AlgorithmList />
      <button className="centered btn" onClick={goToAddAlgorithmPageHandler}>
        Add an Algorithm
      </button>
    </Fragment>
  );
};

export default AllAlgorithms;
