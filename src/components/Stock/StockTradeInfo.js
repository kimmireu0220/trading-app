import { Fragment } from "react";
import classes from "./StockTradeInfo.module.css";

const StockTradeInfo = (props) => {
  const { target } = props;

  return (
    <Fragment>
      <div className="row">
        <div className="column">
          {`${target.buy.day.getFullYear()}.${
            target.buy.day.getMonth() + 1
          }.${target.buy.day.getDate()} `}
          <div className={classes.buyPrice}>{`$${target.buy.price}`}</div>
        </div>
        <div className="column">${target.profit.profit}</div>
        <div className="column">
          {`${target.sell.day.getFullYear()}.${
            target.sell.day.getMonth() + 1
          }.${target.sell.day.getDate()} `}
          <div className={classes.sellPrice}>{`$${target.sell.price}`}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default StockTradeInfo;
