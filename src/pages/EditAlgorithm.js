import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import useHttp from "../hooks/use-http";
import { editAlgorithm } from "../lib/api";
import EditAlgorithmForm from "../components/Algorithm/EditAlgorithmForm";

const EditAlgorithm = () => {
  const { algorithmId } = useParams();
  const history = useHistory();

  const { sendRequest, status } = useHttp(editAlgorithm);

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
    <EditAlgorithmForm
      onEditAlgorithm={editAlgorithmHandler}
      algorithmId={algorithmId}
    />
  );
};

export default EditAlgorithm;
