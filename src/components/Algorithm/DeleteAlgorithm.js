import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { deleteAlgorithm } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

const DeleteAlgorithm = () => {
  const { algorithmId } = useParams();
  const history = useHistory();

  const { sendRequest, status, error } = useHttp(deleteAlgorithm, true);

  useEffect(() => {
    sendRequest(algorithmId);
  }, [sendRequest, algorithmId]);

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

  history.push("/algorithms");
  window.location.reload();

  return null;
};

export default DeleteAlgorithm;
