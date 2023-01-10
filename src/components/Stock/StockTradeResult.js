import { Fragment } from "react";
import StockTradeInfo from "./StockTradeInfo";
import classes from "./StockTradeResult.module.css";

const StockTradeResult = (props) => {
  const { days, closePrices, isSubmitted } = props;
  const { buyAlgorithm, buyTarget, sellAlgorithm, sellTarget } =
    props.algorithm;

  let firstBuyTarget = [];

  for (let i = days.length; i > 0; i--) {
    if (+closePrices[i] < buyTarget) {
      const filteredBuyDay = new Date(days[i]);
      firstBuyTarget.push({ day: filteredBuyDay, price: closePrices[i] });
      break;
    }
  }

  let buyTargets = [...firstBuyTarget];
  let sellTargets = [];
  let checkSellTarget = true;

  for (let i = days.length; i > 0; i--) {
    if (checkSellTarget) {
      if (+closePrices[i] > sellTarget) {
        const day = new Date(days[i]);
        if (buyTargets[buyTargets.length - 1].day < day) {
          sellTargets.push({ day, price: closePrices[i] });
          checkSellTarget = false;
        }
      }
    } else {
      if (+closePrices[i] < buyTarget) {
        const day = new Date(days[i]);
        if (sellTargets[sellTargets.length - 1].day < day) {
          buyTargets.push({ day, price: closePrices[i] });
          checkSellTarget = true;
        }
      }
    }
  }

  if (buyTargets.length > sellTargets.length) {
    buyTargets.pop();
  }

  let profits = [];

  for (let i = 0; i < buyTargets.length; i++) {
    profits.push({
      profit: (+sellTargets[i].price - +buyTargets[i].price).toFixed(2),
    });
  }

  let results = [];

  for (let i = 0; i < buyTargets.length; i++) {
    results.push({
      id: i,
      buy: buyTargets[i],
      profit: profits[i],
      sell: sellTargets[i],
    });
  }

  return (
    <Fragment>
      <hr />
      <div className={classes.title}>
        <p>{`Buy : $${buyTarget} (${buyAlgorithm})`}</p>
        <p>Net Profit</p>
        <p>{`Sell : $${sellTarget} (${sellAlgorithm})`}</p>
      </div>
      {isSubmitted && (
        <div>
          {results.map((result) => (
            <StockTradeInfo key={result.id} result={result} />
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default StockTradeResult;
