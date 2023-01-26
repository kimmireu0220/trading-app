import { Fragment, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import LoadingSpinner from "../components/UI/LoadingSpinner";

import useHttp from "../hooks/use-http";
import { deleteAlgorithm } from "../lib/api";

const DeleteAlgorithm = () => {
  const navigate = useNavigate();

  const { algorithmId } = useParams();

  const { sendRequest, status, error } = useHttp(deleteAlgorithm, true);

  useEffect(() => {
    sendRequest(algorithmId);

    if (status === "completed") navigate("/algorithms");
  }, [sendRequest, algorithmId, status, navigate]);

  return (
    <Fragment>
      {status === "pending" && <LoadingSpinner />}
      {error && <p className="centered mb-3">{error}</p>}
    </Fragment>
  );
};

export default DeleteAlgorithm;
