import React from "react";
import AlgorithmForm from "./AlgorithmForm";

import Algorithm from "../../models/algorithm";

type Props = {
  onAddAlgorithm: (algorithmData: Algorithm) => void;
};

const AddAlgorithmForm: React.FC<Props> = ({ onAddAlgorithm }) => (
  <AlgorithmForm action="add" onAddAlgorithm={onAddAlgorithm} />
);

export default AddAlgorithmForm;
