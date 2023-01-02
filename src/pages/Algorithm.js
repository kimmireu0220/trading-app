import { Fragment } from "react";

import AlgorithmList from "../components/Algorithm/AlgorithmList";
import NewAlgorithmForm from "../components/Algorithm/NewAlgorithmForm";

const Algorithm = () => {
  return (
    <Fragment>
      <AlgorithmList />
      <NewAlgorithmForm />
    </Fragment>
  );
};

export default Algorithm;
