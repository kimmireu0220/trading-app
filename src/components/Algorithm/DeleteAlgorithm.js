import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import LoadingSpinner from "../UI/LoadingSpinner";

import useHttp from "../../hooks/use-http";
import { deleteAlgorithm } from "../../lib/api";

const DeleteAlgorithm = () => {
  const history = useHistory();

  const { algorithmId } = useParams();

  const { sendRequest, status, error } = useHttp(deleteAlgorithm, true);

  useEffect(() => {
    sendRequest(algorithmId);

    if (status === "completed") history.push("/algorithms");
  }, [sendRequest, algorithmId, status, history]);

  if (status === "pending") return <LoadingSpinner />;
  if (error) return <p className="centered mb-3">{error}</p>;

  return null;
};

export default DeleteAlgorithm;
