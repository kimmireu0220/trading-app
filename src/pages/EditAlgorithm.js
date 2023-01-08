import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import AlgorithmForm from "../components/Algorithm/AlgorithmForm";
import useHttp from "../hooks/use-http";
import { editAlgorithm } from "../lib/api";

const EditAlgorithm = () => {
  const { algorithmId } = useParams();

  const { sendRequest, status } = useHttp(editAlgorithm);
  const history = useHistory();

  useEffect(() => {
    if (status === "completed") {
      history.push("/algorithms");
      window.location.reload();
    }
  }, [status, history]);

  const editAlgorithmHandler = (algorithmData) => {
    sendRequest(algorithmData);
  };

  return (
    <AlgorithmForm
      onEditAlgorithm={editAlgorithmHandler}
      action="edit"
      algorithmId={algorithmId}
    />
  );
};

export default EditAlgorithm;
