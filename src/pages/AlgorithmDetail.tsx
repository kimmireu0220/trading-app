import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import HighlightedAlgorithm from "../components/Algorithm/HighlightedAlgorithm";
import AlgorithmDetailOption from "../components/Algorithm/AlgorithmDetailOption";
import Card from "../components/UI/Card";
import ConfirmModal from "../components/UI/ConfirmModal";
import LoadingSpinner from "../components/UI/LoadingSpinner";

import useHttp from "../hooks/use-http";
import { getSingleAlgorithm } from "../lib/api";

const AlgorithmDetail = () => {
  const navigate = useNavigate();

  const { algorithmId } = useParams<{ algorithmId: string }>();

  const [showConfirm, setShowConfirm] = useState(false);

  const {
    sendRequest,
    status,
    data: loadedAlgorithm,
    error,
  } = useHttp(getSingleAlgorithm, true);

  const goToEditPageHandler = () => navigate(`/algorithms/${algorithmId}/edit`);

  const deleteAlgorithmHandler = () =>
    navigate(`/algorithms/${algorithmId}/delete`);

  const backToPrevPageHandler = () => navigate(-1);

  const toggleConfirmHandler = () => setShowConfirm((prevState) => !prevState);

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
        <Card>
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
        </Card>
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

  return (
    <Fragment>
      {status === "pending" && <LoadingSpinner />}
      {error && <p className="centered mb-3">{error}</p>}
      {!loadedAlgorithm ||
        (!loadedAlgorithm.title && (
          <p className="centered mb-3">No algorithm found!</p>
        ))}
    </Fragment>
  );
};

export default AlgorithmDetail;
