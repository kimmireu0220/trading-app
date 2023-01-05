import { useContext, useState } from "react";

import AlgorithmContext from "../../store/algorithm-context";
import classes from "./StockAlgorithm.module.css";

const StockAlgoritm = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState();

  const algorithmCtx = useContext(AlgorithmContext);
  const { algorithms } = algorithmCtx;

  const startTradingHandler = (event) => {
    event.preventDefault();

    if (selectedAlgorithm) {
      console.log(selectedAlgorithm);
    } else {
      console.log("Please select algorithm");
    }
  };

  const selectAlgorithmHandler = (event) => {
    setSelectedAlgorithm(event.target.value);
  };

  return (
    <form onSubmit={startTradingHandler} className={classes.form}>
      <select
        onChange={selectAlgorithmHandler}
        id="algorithm"
        className={classes.select}
      >
        <option value="">Select Algorithm</option>
        {algorithms.map((algorithm) => (
          <option key={algorithm.id} value={algorithm.logic}>
            {algorithm.title}
          </option>
        ))}
      </select>
      <button className="btn">Trade</button>
    </form>
  );
};

export default StockAlgoritm;
