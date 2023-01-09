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
      id: i,
      profit: (+sellTargets[i].price - +buyTargets[i].price).toFixed(2),
    });
  }

  return (
    <div>
      <hr />
      <div className={classes.result}>
        <div>
          <p>{`Buy : $${buyTarget} (${buyAlgorithm}) `}</p>
          {isSubmitted && (
            <ul>
              {buyTargets.map((target) => (
                <li className={classes.trade} key={target.day}>
                  <div>
                    {`${target.day.getFullYear()}.${
                      target.day.getMonth() + 1
                    }.${target.day.getDate()} `}
                  </div>
                  <div className={classes.buyPrice}>{`$${target.price}`}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={classes.profit}>
          <p>Net Profit</p>
          {isSubmitted && (
            <ul>
              {profits.map((profit) => (
                <div>
                  <li key={profit.id}>{`$${profit.profit}`}</li>
                  <br></br>
                </div>
              ))}
            </ul>
          )}
        </div>
        <div>
          <p>{`Sell : $${sellTarget} (${sellAlgorithm})`}</p>
          {isSubmitted && (
            <ul>
              {sellTargets.map((target) => (
                <li className={classes.trade} key={target.day}>
                  <div>
                    {`${target.day.getFullYear()}.${
                      target.day.getMonth() + 1
                    }.${target.day.getDate()} `}
                  </div>
                  <div className={classes.sellPrice}>{`$${target.price}`}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockTradeResult;
