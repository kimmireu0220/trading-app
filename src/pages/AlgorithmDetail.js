import { Fragment, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";

import useHttp from "../hooks/use-http";
import { getSingleAlgorithm } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import HighlightedAlgorithm from "../components/Algorithm/HighlightedAlgorithm";

const AlgorithmDetail = () => {
  const { algorithmId } = useParams();
  const { pathname } = useLocation();

  const {
    sendRequest,
    status,
    data: loadedAlgorithm,
    error,
  } = useHttp(getSingleAlgorithm, true);

  useEffect(() => {
    sendRequest(algorithmId);
  }, [sendRequest, algorithmId]);

  if (loadedAlgorithm && loadedAlgorithm.title) {
    const {
      title,
      buyAlgorithm,
      buyTarget,
      sellAlgorithm,
      sellTarget,
      description,
    } = loadedAlgorithm;

    return (
      <Fragment>
        <HighlightedAlgorithm
          title={title}
          buyAlgorithm={buyAlgorithm}
          buyTarget={buyTarget}
          sellAlgorithm={sellAlgorithm}
          sellTarget={sellTarget}
          description={description}
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
  }

  // Error or Loading status

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

  if (!loadedAlgorithm || !loadedAlgorithm.title) {
    return <p className="centered">No algorithm found!</p>;
  }
};

export default AlgorithmDetail;
