import React from "react";

import AlgorithmForm from "./AlgorithmForm";

import Algorithm from "../../models/algorithm";

type Props = {
  onAddAlgorithm: (algorithmData: Algorithm) => void;
};

const AddAlgorithmForm: React.FC<Props> = ({ onAddAlgorithm }) => {
  const DUMMY_ALGORITHM = {
    title: "",
    buyAlgorithm: "",
    buyTarget: "",
    sellAlgorithm: "",
    sellTarget: "",
    description: "",
  };

  return (
    <AlgorithmForm
      action="add"
      onAddAlgorithm={onAddAlgorithm}
      algorithmConfig={DUMMY_ALGORITHM}
    />
  );
};

export default AddAlgorithmForm;
