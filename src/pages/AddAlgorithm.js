import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import useHttp from "../hooks/use-http";
import { addAlgorithm } from "../lib/api";
import AddAlgorithmForm from "../components/Algorithm/AddAlgorithmForm";

const AddAlgorithm = () => {
  const history = useHistory();
  const { sendRequest, status } = useHttp(addAlgorithm);

  useEffect(() => {
    if (status === "completed") {
      history.push("/algorithms");
      window.location.reload();
    }
  }, [status, history]);

  const addAlgorithmHandler = (algorithmData) => {
    sendRequest(algorithmData);
  };

  return <AddAlgorithmForm onAddAlgorithm={addAlgorithmHandler} />;
};

export default AddAlgorithm;
