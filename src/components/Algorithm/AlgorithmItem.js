import Card from "../UI/Card";

const AlgorithmItem = (props) => {
  return (
    <li>
      <Card className="centered">
        <div>{`Title : ${props.title}`}</div>
        <div>{`Logic : ${props.logic}`}</div>
        <div>{`Description : ${props.description}`}</div>
      </Card>
    </li>
  );
};

export default AlgorithmItem;
