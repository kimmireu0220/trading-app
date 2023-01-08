import { Fragment, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";

import useHttp from "../hooks/use-http";
import { getSingleAlgorithm } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import HighlightedAlgorithm from "../components/Algorithm/HighlightedAlgorithm";

const AlgorithmDetail = () => {
  const { pathname } = useLocation();
  const { algorithmId } = useParams();

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
        buyAlgorithm={loadedAlgorithm.buyAlgorithm}
        buyTarget={loadedAlgorithm.buyTarget}
        sellAlgorithm={loadedAlgorithm.sellAlgorithm}
        sellTarget={loadedAlgorithm.sellTarget}
        description={loadedAlgorithm.description}
      />
      <ul>
        <li>
          <Link
            className="float--right"
            style={{ textDecoration: "none" }}
            to="/algorithms"
          >
            Back to list
          </Link>
        </li>
        <li>
          <Link
            className="float--right"
            style={{ textDecoration: "none" }}
            to={`${pathname}/edit`}
          >
            Edit
          </Link>
        </li>
      </ul>
    </Fragment>
  );
};

export default AlgorithmDetail;
