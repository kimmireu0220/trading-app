import React, { Fragment } from "react";

import StockTradeInfo from "./StockTradeInfo";

import classes from "./StockTradeResult.module.css";

type Props = {
  days: string[];
  closes: string[];
  isSubmitted: boolean;
  algorithm: {
    buyAlgorithm: string;
    buyTarget: string;
    sellAlgorithm: string;
    sellTarget: string;
  };
};

const StockTradeResult: React.FC<Props> = (props) => {
  const { days, closes, isSubmitted } = props;
  const { buyAlgorithm, buyTarget, sellAlgorithm, sellTarget } =
    props.algorithm;

  let results = [];
  let buyTargets = [];
  let sellTargets = [];
  let checkSellTarget = true;

  for (let i = 0; i < days.length; i++) {
    if (+closes[99 - i] < +buyTarget) {
      const filteredBuyDay = new Date(days[99 - i]);
      buyTargets.push({
        day: filteredBuyDay,
        price: Number(closes[99 - i]).toFixed(2),
      });
      break;
    }
  }

  if (buyTargets.length !== 0) {
    for (let i = 0; i < days.length; i++) {
      if (checkSellTarget) {
        if (+closes[99 - i] > +sellTarget) {
          const day = new Date(days[99 - i]);
          if (buyTargets[buyTargets.length - 1].day < day) {
            sellTargets.push({ day, price: Number(closes[99 - i]).toFixed(2) });
            checkSellTarget = false;
          }
        }
      } else {
        if (+closes[99 - i] < +buyTarget) {
          const day = new Date(days[99 - i]);
          if (sellTargets[sellTargets.length - 1].day < day) {
            buyTargets.push({ day, price: Number(closes[99 - i]).toFixed(2) });
            checkSellTarget = true;
          }
        }
      }
    }

    if (buyTargets.length > sellTargets.length) buyTargets.pop();

    for (let i = 0; i < buyTargets.length; i++) {
      results.push({
        id: i,
        buy: buyTargets[i],
        profit: (+sellTargets[i].price - +buyTargets[i].price).toFixed(2),
        sell: sellTargets[i],
      });
    }
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
