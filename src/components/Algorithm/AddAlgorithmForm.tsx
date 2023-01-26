import React from "react";
import AlgorithmForm from "./AlgorithmForm";

type Props = {
  onAddAlgorithm: (algorithmData: {
    title: string;
    buyAlgorithm: string;
    buyTarget: string;
    sellAlgorithm: string;
    sellTarget: string;
    description: string;
  }) => void;
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
