import { Fragment, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import useHttp from "../hooks/use-http";
import { getSingleAlgorithm } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import HighlightedAlgorithm from "../components/Algorithm/HighlightedAlgorithm";

const AlgorithmDetail = () => {
  const params = useParams();
  const { algorithmId } = params;

  const {
    sendRequest,
    status,
    data: loadedAlgorithm,
    error,
  } = useHttp(getSingleAlgorithm, true);

  useEffect(() => {
    sendRequest(algorithmId);
  }, [sendRequest, algorithmId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedAlgorithm) {
    return <p>No algorithm found!</p>;
  }

  console.log(loadedAlgorithm);

  return (
    <Fragment>
      <HighlightedAlgorithm
        title={loadedAlgorithm.title}
        buyAlgorithm={loadedAlgorithm.buyAlgorithm}
        buyTarget={loadedAlgorithm.buyTarget}
        buyTiming={loadedAlgorithm.buyTiming}
        sellAlgorithm={loadedAlgorithm.sellAlgorithm}
        sellTarget={loadedAlgorithm.sellTarget}
        sellTiming={loadedAlgorithm.sellTiming}
        description={loadedAlgorithm.description}
      />
      <Link
        className="float--right"
        style={{ textDecoration: "none" }}
        to="/algorithms"
      >
        Back to list
      </Link>
    </Fragment>
  );
};

export default AlgorithmDetail;
