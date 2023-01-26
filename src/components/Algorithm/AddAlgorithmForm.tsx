import React from "react";
import AlgorithmForm from "./AlgorithmForm";

import Algorithm from "../../models/algorithm";

type Props = {
  onAddAlgorithm: (algorithmData: Algorithm) => void;
};

const AddAlgorithmForm: React.FC<Props> = ({ onAddAlgorithm }) => (
  <AlgorithmForm
    algorithmId=""
    action="add"
    onAddAlgorithm={onAddAlgorithm}
    onEditAlgorithm={() => {}}
  />
);

export default AddAlgorithmForm;
