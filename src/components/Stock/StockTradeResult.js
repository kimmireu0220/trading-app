import { Fragment } from "react";
import StockTradeInfo from "./StockTradeInfo";
import classes from "./StockTradeResult.module.css";

const StockTradeResult = (props) => {
  const { days, closes, isSubmitted } = props;
  const { buyAlgorithm, buyTarget, sellAlgorithm, sellTarget } =
    props.algorithm;

  let results = [];
  let buyTargets = [];
  let sellTargets = [];
  let checkSellTarget = true;

  for (let i = days.length; i > 0; i--) {
    if (+closes[i] < buyTarget) {
      const filteredBuyDay = new Date(days[i]);
      buyTargets.push({ day: filteredBuyDay, price: closes[i] });
      break;
    }
  }

  for (let i = days.length; i > 0; i--) {
    if (checkSellTarget) {
      if (+closes[i] > sellTarget) {
        const day = new Date(days[i]);
        if (buyTargets[buyTargets.length - 1].day < day) {
          sellTargets.push({ day, price: closes[i] });
          checkSellTarget = false;
        }
      }
    } else {
      if (+closes[i] < buyTarget) {
        const day = new Date(days[i]);
        if (sellTargets[sellTargets.length - 1].day < day) {
          buyTargets.push({ day, price: closes[i] });
          checkSellTarget = true;
        }
      }
    }
  }

  if (buyTargets.length > sellTargets.length) {
    buyTargets.pop();
  }

  for (let i = 0; i < buyTargets.length; i++) {
    results.push({
      id: i,
      buy: buyTargets[i],
      profit: (+sellTargets[i].price - +buyTargets[i].price).toFixed(2),
      sell: sellTargets[i],
    });
  }

  return (
    <Fragment>
      <div className={classes.hr}>
        <hr />
      </div>
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
