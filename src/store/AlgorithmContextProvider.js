import { useEffect } from "react";

import useHttp from "../hooks/use-http";
import { getAllAlgorithms } from "../lib/api";
import AlgorithmContext from "./algorithm-context";

const AlgorithmContextProvider = (props) => {
  const {
    sendRequest,
    status,
    data: algorithms,
    error,
  } = useHttp(getAllAlgorithms, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  return (
    <AlgorithmContext.Provider value={{ status, algorithms, error }}>
      {props.children}
    </AlgorithmContext.Provider>
  );
};

export default AlgorithmContextProvider;
