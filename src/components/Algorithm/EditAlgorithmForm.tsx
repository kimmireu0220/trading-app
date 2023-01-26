import React, { Fragment, useEffect } from "react";

import AlgorithmForm from "./AlgorithmForm";
import LoadingSpinner from "../UI/LoadingSpinner";

import useHttp from "../../hooks/use-http";
import { getSingleAlgorithm } from "../../lib/api";
import Algorithm from "../../models/algorithm";

type Props = {
  algorithmId: string;
  onEditAlgorithm: (algorithmData: Algorithm) => Promise<void>;
};

const EditAlgorithmForm: React.FC<Props> = (props) => {
  const { algorithmId, onEditAlgorithm } = props;

  const {
    sendRequest,
    status,
    data: loadedAlgorithm,
    error,
  } = useHttp(getSingleAlgorithm);

  useEffect(() => {
    sendRequest(algorithmId);
  }, [sendRequest, algorithmId]);

  return (
    <Fragment>
      {loadedAlgorithm && (
        <AlgorithmForm
          action="edit"
          algorithmId={algorithmId}
          onAddAlgorithm={() => {}}
          onEditAlgorithm={onEditAlgorithm}
          algorithmConfig={loadedAlgorithm}
        />
      )}
      {status === "pending" && <LoadingSpinner />}
      {error && <p className="centered mb-3">{error}</p>}
    </Fragment>
  );
};

export default EditAlgorithmForm;
