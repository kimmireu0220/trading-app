import { useEffect } from "react";
import { useNavigate } from "react-router";

import AddAlgorithmForm from "../components/Algorithm/AddAlgorithmForm";

import useHttp from "../hooks/use-http";
import { addAlgorithm } from "../lib/api";
import Algorithm from "../models/algorithm";

const AddAlgorithm = () => {
  const navigate = useNavigate();

  const { sendRequest, status } = useHttp(addAlgorithm);

  useEffect(() => {
    if (status === "completed") navigate("/algorithms");
  }, [status, navigate]);

  const addAlgorithmHandler = (algorithmData: Algorithm) =>
    sendRequest(algorithmData);

  return <AddAlgorithmForm onAddAlgorithm={addAlgorithmHandler} />;
};

export default AddAlgorithm;
