import React from "react";

const AlgorithmContext = React.createContext({
  status: "",
  algorithms: [],
  error: "",
});

export default AlgorithmContext;
