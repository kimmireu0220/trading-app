import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EditAlgorithmForm from "../components/Algorithm/EditAlgorithmForm";

import useHttp from "../hooks/use-http";
import { editAlgorithm } from "../lib/api";
import Algorithm from "../models/algorithm";

const EditAlgorithm = () => {
  const navigate = useNavigate();
  const { sendRequest, status } = useHttp(editAlgorithm);
  const { algorithmId = "" } = useParams<{ algorithmId: string }>();

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
