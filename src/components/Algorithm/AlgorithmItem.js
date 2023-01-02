import Card from "../UI/Card";

const AlgorithmItem = (props) => {
  return (
    <li key={props.key}>
      <Card className="centered">{props.title}</Card>
    </li>
  );
};

export default AlgorithmItem;
