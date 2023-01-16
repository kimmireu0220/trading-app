import { useContext, useState } from "react";

import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import StockTradeResult from "./StockTradeResult";
import classes from "./StockAlgorithm.module.css";
import AlgorithmContext from "../../store/algorithm-context";

const StockAlgoritm = (props) => {
  const { days, closePrices } = props;
  const { algorithms } = useContext(AlgorithmContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);

  const errorHandler = () => {
    setIsSubmitted(false);
  };

  const startTradingHandler = (event) => {
    event.preventDefault();

    setIsSubmitted(true);
  };

  const selectAlgorithmHandler = (event) => {
    if (event.target.value) {
      const { buyAlgorithm, buyTarget, sellAlgorithm, sellTarget } = JSON.parse(
        event.target.value
      );

      setSelectedAlgorithm({
        buyAlgorithm,
        buyTarget,
        sellAlgorithm,
        sellTarget,
      });
    } else {
      setSelectedAlgorithm(null);
    }
    setIsSubmitted(false);
  };

  return (
    <Card>
      <form onSubmit={startTradingHandler} className={classes.form}>
        <select onChange={selectAlgorithmHandler} className={classes.select}>
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
