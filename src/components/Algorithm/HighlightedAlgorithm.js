import Card from "../UI/Card";
import classes from "./HighlightedAlgorithm.module.css";

const HighlightedAlgorithm = (props) => {
  return (
    <Card>
      <h1>{props.title}</h1>
      <hr />
      <h2>
        <p
          className={classes.buy}
        >{`Buy : $${props.buyTarget} (${props.buyAlgorithm})`}</p>
        <p
          className={classes.sell}
        >{`Sell : $${props.sellTarget} (${props.sellAlgorithm})`}</p>
      </h2>
      <hr />
      <h3>{props.description}</h3>
    </Card>
  );
};

export default HighlightedAlgorithm;
