import { useContext, useState } from "react";

import AlgorithmContext from "../../store/algorithm-context";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import classes from "./StockAlgorithm.module.css";
import StockTradeResult from "./StockTradeResult";

const StockAlgoritm = (props) => {
  const { days, closePrices } = props;
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const algorithmCtx = useContext(AlgorithmContext);
  const { algorithms } = algorithmCtx;

  const errorHandler = () => {
    setIsSubmitted(false);
  };

  const startTradingHandler = (event) => {
    event.preventDefault();

    setIsSubmitted(true);
  };

  const selectAlgorithmHandler = (event) => {
    if (event.target.value) {
      const algorithm = JSON.parse(event.target.value);
      const { buyAlgorithm, buyTarget, sellAlgorithm, sellTarget } = algorithm;
      setSelectedAlgorithm({
        buyAlgorithm,
        buyTarget,
        sellAlgorithm,
        sellTarget,
      });
    } else {
      setIsSubmitted(false);
      setSelectedAlgorithm(null);
    }
  };

  return (
    <Card>
      <form onSubmit={startTradingHandler} className={classes.form}>
        <select
          onChange={selectAlgorithmHandler}
          id="algorithm"
          className={classes.select}
        >
          <option value="">Select Algorithm</option>
          {algorithms.map((algorithm) => (
            <option key={algorithm.id} value={JSON.stringify(algorithm)}>
              {algorithm.title}
            </option>
          ))}
        </select>
        <button className="btn">Trade</button>
      </form>
      {selectedAlgorithm && (
        <StockTradeResult
          days={days}
          closePrices={closePrices}
          algorithm={selectedAlgorithm}
          isSubmitted={isSubmitted}
        />
      )}
      {isSubmitted && !selectedAlgorithm && (
        <ErrorModal
          title="Error"
          message="Please select your algorithm"
          onConfirm={errorHandler}
        />
      )}
    </Card>
  );
};

export default StockAlgoritm;
