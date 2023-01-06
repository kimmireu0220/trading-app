import Card from "../UI/Card";

const HighlightedAlgorithm = (props) => {
  return (
    <Card>
      <h1>{props.title}</h1>
      <h2>
        <p>{`Buy : ${props.buyAlgorithm} ${props.buyTarget}`}</p>
        <p>{`Sell : ${props.sellAlgorithm} ${props.sellTarget}`}</p>
      </h2>
      <h3>{props.description}</h3>
    </Card>
  );
};

export default HighlightedAlgorithm;
