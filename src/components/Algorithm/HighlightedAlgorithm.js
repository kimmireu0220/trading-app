import classes from "./HighlightedAlgorithm.module.css";
import Card from "../UI/Card";

const HighlightedAlgorithm = (props) => {
  const {
    title,
    buyAlgorithm,
    buyTarget,
    sellAlgorithm,
    sellTarget,
    description,
  } = props;

  return (
    <Card>
      <h1>{title}</h1>
      <hr />
      <h2>
        <p className={classes.buy}>{`Buy : $${buyTarget} (${buyAlgorithm})`}</p>
        <p
          className={classes.sell}
        >{`Sell : $${sellTarget} (${sellAlgorithm})`}</p>
      </h2>
      <hr />
      <h3>{description}</h3>
    </Card>
  );
};

export default HighlightedAlgorithm;
