import { Fragment } from "react";
import classes from "./StockTradeInfo.module.css";

const StockTradeInfo = (props) => {
  const { result } = props;

  return (
    <Fragment>
      <div className="row">
        <div className="column">
          {`${result.buy.day.getFullYear()}.${
            result.buy.day.getMonth() + 1
          }.${result.buy.day.getDate()} `}
          <div className={classes.buyPrice}>{`$${result.buy.price}`}</div>
        </div>
        <div className="column">${result.profit.profit}</div>
        <div className="column">
          {`${result.sell.day.getFullYear()}.${
            result.sell.day.getMonth() + 1
          }.${result.sell.day.getDate()} `}
          <div className={classes.sellPrice}>{`$${result.sell.price}`}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default StockTradeInfo;
