import { Fragment } from "react";

import { Link } from "react-router-dom";

import AlgorithmList from "../components/Algorithm/AlgorithmList";

const AllAlgorithms = () => {
  return (
    <Fragment>
      <AlgorithmList />
      <Link className="centered linkButton" to="/add-algorithm">
        Add an Algorithm
      </Link>
    </Fragment>
  );
};

export default AllAlgorithms;
