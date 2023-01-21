import { useEffect, useState } from "react";

import StockTradeResult from "./StockTradeResult";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import LoadingSpinner from "../UI/LoadingSpinner";

import useHttp from "../../hooks/use-http";
import { getAllAlgorithms } from "../../lib/api";

import classes from "./StockAlgorithm.module.css";

const StockAlgoritm = ({ algorithmConfig }) => {
  const { days, closes } = algorithmConfig;

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);

  const {
    sendRequest,
    status,
    data: algorithms,
    error,
  } = useHttp(getAllAlgorithms, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  const errorHandler = () => setIsSubmitted(false);

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
    } else setSelectedAlgorithm(null);

    setIsSubmitted(false);
  };

  if (status === "pending") return <LoadingSpinner />;
  if (error) return <p className="centered focused">{error}</p>;

  return (
    <div className="mt-3">
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
          <button className={classes.trade}>Trade</button>
        </form>
        {selectedAlgorithm && (
          <StockTradeResult
            days={days}
            closes={closes}
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
    </div>
  );
};

export default StockAlgoritm;
