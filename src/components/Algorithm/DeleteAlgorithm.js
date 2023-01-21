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
  }, [sendRequest, algorithmId]);

  if (status === "pending") return <LoadingSpinner />;
  if (error) return <p className="centered focused mt-3">{error}</p>;

  history.push("/algorithms");

  return null;
};

export default DeleteAlgorithm;
