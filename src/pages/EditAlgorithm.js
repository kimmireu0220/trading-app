import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import EditAlgorithmForm from "../components/Algorithm/EditAlgorithmForm";

import useHttp from "../hooks/use-http";
import { editAlgorithm } from "../lib/api";

const EditAlgorithm = () => {
  const history = useHistory();

  const { algorithmId } = useParams();

  const { sendRequest, status } = useHttp(editAlgorithm);

  useEffect(() => {
    if (status === "completed") history.push("/algorithms");
  }, [status, history]);

  const editAlgorithmHandler = (algorithmData) => sendRequest(algorithmData);

  return (
    <EditAlgorithmForm
      onEditAlgorithm={editAlgorithmHandler}
      algorithmId={algorithmId}
    />
  );
};

export default EditAlgorithm;
