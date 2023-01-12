import { Fragment } from "react";
import classes from "./StockTradeInfo.module.css";

const StockTradeInfo = ({ result }) => {
  const buyDay = {
    year: result.buy.day.getFullYear(),
    month: (result.buy.day.getMonth() + 1).toString().padStart(2, "0"),
    date: result.buy.day.getDate().toString().padStart(2, "0"),
  };

  const sellDay = {
    year: result.sell.day.getFullYear(),
    month: (result.sell.day.getMonth() + 1).toString().padStart(2, "0"),
    date: result.sell.day.getDate().toString().padStart(2, "0"),
  };

  return (
    <Fragment>
      <div className="row">
        <div className={`${classes.info} "column"`}>
          <div>{`${buyDay.year}-${buyDay.month}-${buyDay.date} `}</div>
          <div className={classes.buyPrice}>{`$${result.buy.price}`}</div>
        </div>
        <div className={`${classes.info} "column"`}>${result.profit}</div>
        <div className={`${classes.info} "column"`}>
          <div>{`${sellDay.year}-${sellDay.month}-${sellDay.date} `}</div>
          <div className={classes.sellPrice}>{`$${result.sell.price}`}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default StockTradeInfo;
