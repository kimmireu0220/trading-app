import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import AddAlgorithmForm from "../components/Algorithm/AddAlgorithmForm";

import useHttp from "../hooks/use-http";
import { addAlgorithm } from "../lib/api";

const AddAlgorithm = () => {
  const history = useHistory();

  const { sendRequest, status } = useHttp(addAlgorithm);

  useEffect(() => {
    if (status === "completed") {
      history.push("/algorithms");
    }
  }, [status, history]);

  const addAlgorithmHandler = (algorithmData) => sendRequest(algorithmData);

  return <AddAlgorithmForm onAddAlgorithm={addAlgorithmHandler} />;
};

export default AddAlgorithm;
