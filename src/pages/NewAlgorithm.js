import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import AlgorithmForm from "../components/Algorithm/AlgorithmForm";
import useHttp from "../hooks/use-http";
import { addAlgorithm } from "../lib/api";

const NewQuote = () => {
  const { sendRequest, status } = useHttp(addAlgorithm);
  const history = useHistory();

  useEffect(() => {
    if (status === "completed") {
      history.push("/algorithms");
    }
  }, [status, history]);

  const addAlgorithmHandler = (algorithmData) => {
    sendRequest(algorithmData);
  };

  return (
    <AlgorithmForm
      isLoading={status === "pending"}
      onAddAlgorithm={addAlgorithmHandler}
    />
  );
};

export default NewQuote;
