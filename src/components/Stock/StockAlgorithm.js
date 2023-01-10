import { useContext, useState } from "react";

import classes from "./StockAlgorithm.module.css";
import AlgorithmContext from "../../store/algorithm-context";
import Card from "../UI/Card";
import StockTradeResult from "./StockTradeResult";
import ErrorModal from "../UI/ErrorModal";

const StockAlgoritm = (props) => {
  const { algorithms } = useContext(AlgorithmContext);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { days, closePrices } = props;

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
      {selectedAlgorithm && selectedAlgorithm.buyAlgorithm === "price" && (
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
