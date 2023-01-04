import Card from "../UI/Card";

const HighlightedAlgorithm = (props) => {
  return (
    <Card>
      <h1>{props.title}</h1>
      <h2>{props.logic}</h2>
      <h3>{props.description}</h3>
    </Card>
  );
};

export default HighlightedAlgorithm;
