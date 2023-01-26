import React, { Fragment, useEffect } from "react";

import AlgorithmForm from "./AlgorithmForm";
import Algorithm from "../../models/algorithm";
import LoadingSpinner from "../UI/LoadingSpinner";

import useHttp from "../../hooks/use-http";
import { getSingleAlgorithm } from "../../lib/api";

type Props = {
  onEditAlgorithm: (algorithmData: Algorithm) => Promise<void>;
  algorithmId: string;
};

const EditAlgorithmForm: React.FC<Props> = ({
  onEditAlgorithm,
  algorithmId,
}) => {
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
        onAddAlgorithm={() => {}}
        onEditAlgorithm={onEditAlgorithm}
      />
    );
  }

  return (
    <Fragment>
      {status === "pending" && <LoadingSpinner />}
      {error && <p className="centered mb-3">{error}</p>}
    </Fragment>
  );
};

export default EditAlgorithmForm;
