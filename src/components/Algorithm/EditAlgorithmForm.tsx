import { Fragment, useEffect } from "react";

import AlgorithmForm from "./AlgorithmForm";
import LoadingSpinner from "../UI/LoadingSpinner";

import useHttp from "../../hooks/use-http";
import { getSingleAlgorithm } from "../../lib/api";
import Algorithm from "../../models/algorithm";

type Props = {
  algorithmId: string;
  onEditAlgorithm: (algorithmData: Algorithm) => void;
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

  if (status === "pending") return <LoadingSpinner />;
  if (error) return <p className="centered mb-3">{error}</p>;

  return (
    <Fragment>
      {loadedAlgorithm && (
        <AlgorithmForm
          action="edit"
          algorithmId={algorithmId}
          onEditAlgorithm={onEditAlgorithm}
          algorithmConfig={loadedAlgorithm}
        />
      )}
    </Fragment>
  );
};

export default EditAlgorithmForm;
