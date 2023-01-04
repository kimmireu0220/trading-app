import { Fragment, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import HighlightedAlgorithm from "../components/Algorithm/HighlightedAlgorithm";
import useHttp from "../hooks/use-http";
import { getSingleAlgorithm } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

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

  return (
    <Fragment>
      <HighlightedAlgorithm
        title={loadedAlgorithm.title}
        logic={loadedAlgorithm.logic}
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
