import { Fragment, useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";

import useHttp from "../hooks/use-http";
import { getSingleAlgorithm } from "../lib/api";
import ConfirmModal from "../components/UI/ConfirmModal";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import HighlightedAlgorithm from "../components/Algorithm/HighlightedAlgorithm";
import AlgorithmDetailOption from "../components/Algorithm/AlgorithmDetailOption";

const AlgorithmDetail = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { algorithmId } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();

  const {
    sendRequest,
    status,
    data: loadedAlgorithm,
    error,
  } = useHttp(getSingleAlgorithm, true);

  const goToEditAlgorithmHandler = () => {
    history.push(`${pathname}/edit`);
  };

  const toggleConfirmHandler = () => {
    setShowConfirm((currentState) => !currentState);
  };

  const deleteAlgorithmHandler = () => {
    history.push(`${pathname}/delete`);
  };

  const backToAlgorithmHandler = () => {
    history.goBack();
  };

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
        <AlgorithmDetailOption
          onGoToEdit={goToEditAlgorithmHandler}
          onToggle={toggleConfirmHandler}
          onGoBack={backToAlgorithmHandler}
        />
        {showConfirm && (
          <ConfirmModal
            title="Do you want to delete this algorithm?"
            message="If you really want to delete, click 'Okay' button"
            onClose={toggleConfirmHandler}
            onConfirm={deleteAlgorithmHandler}
          />
        )}
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
