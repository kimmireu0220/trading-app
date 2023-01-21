import AlgorithmForm from "./AlgorithmForm";

const AddAlgorithmForm = (props) => (
  <AlgorithmForm action="add" onAddAlgorithm={props.onAddAlgorithm} />
);

export default AddAlgorithmForm;
