import { useEffect } from "react";

import AlgorithmForm from "./AlgorithmForm";
import LoadingSpinner from "../UI/LoadingSpinner";

import useHttp from "../../hooks/use-http";
import { getSingleAlgorithm } from "../../lib/api";

const EditAlgorithmForm = (props) => {
  const { algorithmId } = props;

  const {
    sendRequest,
    status,
    data: loadedAlgorithm,
    error,
  } = useHttp(getSingleAlgorithm);

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
      <AlgorithmForm
        action="edit"
        title={title}
        buyAlgorithm={buyAlgorithm}
        buyTarget={buyTarget}
        sellAlgorithm={sellAlgorithm}
        sellTarget={sellTarget}
        description={description}
        algorithmId={algorithmId}
        onEditAlgorithm={props.onEditAlgorithm}
      />
    );
  }

  if (status === "pending") return <LoadingSpinner />;
  if (error) return <p className="centered mb-3">{error}</p>;
};

export default EditAlgorithmForm;
