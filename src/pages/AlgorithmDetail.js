import { Fragment, useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";

import useHttp from "../hooks/use-http";
import { getSingleAlgorithm } from "../lib/api";
import ConfirmModal from "../components/UI/ConfirmModal";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import HighlightedAlgorithm from "../components/Algorithm/HighlightedAlgorithm";
import AlgorithmDetailOption from "../components/Algorithm/AlgorithmDetailOption";

const AlgorithmDetail = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { algorithmId } = useParams();
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    sendRequest,
    status,
    data: loadedAlgorithm,
    error,
  } = useHttp(getSingleAlgorithm, true);

  const goToEditPageHandler = () => {
    history.push(`${pathname}/edit`);
  };

  const deleteAlgorithmHandler = () => {
    history.push(`${pathname}/delete`);
  };

  const backToPrevPageHandler = () => {
    history.goBack();
  };

  const toggleConfirmHandler = () => {
    setShowConfirm((prevState) => !prevState);
  };

  useEffect(() => {
    sendRequest(algorithmId);
  }, [sendRequest, algorithmId]);

  if (loadedAlgorithm) {
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
          algorithmConfig={{
            title,
            buyAlgorithm,
            buyTarget,
            sellAlgorithm,
            sellTarget,
            description,
          }}
        />
        <AlgorithmDetailOption
          onGoToEdit={goToEditPageHandler}
          onToggle={toggleConfirmHandler}
          onGoBack={backToPrevPageHandler}
        />
        <ConfirmModal
          show={showConfirm}
          title="Do you want to delete this algorithm?"
          message="If you really want to delete, click 'Okay' button"
          onClose={toggleConfirmHandler}
          onConfirm={deleteAlgorithmHandler}
        />
      </Fragment>
    );
  }

  if (status === "pending") {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedAlgorithm || !loadedAlgorithm.title) {
    return <p className="centered">No algorithm found!</p>;
  }
};

export default AlgorithmDetail;
