import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EditAlgorithmForm from "../components/Algorithm/EditAlgorithmForm";
import Algorithm from "../models/algorithm";

import useHttp from "../hooks/use-http";
import { editAlgorithm } from "../lib/api";

const EditAlgorithm = () => {
  const navigate = useNavigate();
  const { algorithmId = "" } = useParams<{ algorithmId: string }>();

  const { sendRequest, status } = useHttp(editAlgorithm);

  useEffect(() => {
    if (status === "completed") navigate("/algorithms");
  }, [status, navigate]);

  const editAlgorithmHandler = (algorithmData: Algorithm) =>
    sendRequest(algorithmData);

  return (
    <EditAlgorithmForm
      onEditAlgorithm={editAlgorithmHandler}
      algorithmId={algorithmId}
    />
  );
};

export default EditAlgorithm;
