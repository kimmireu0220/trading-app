import classes from "./StockTradeInfo.module.css";

const StockTradeInfo = ({ result }) => {
  const { buy, sell, profit } = result;

  const buyDay = {
    year: buy.day.getFullYear(),
    month: (buy.day.getMonth() + 1).toString().padStart(2, "0"),
    date: buy.day.getDate().toString().padStart(2, "0"),
  };
  const sellDay = {
    year: sell.day.getFullYear(),
    month: (sell.day.getMonth() + 1).toString().padStart(2, "0"),
    date: sell.day.getDate().toString().padStart(2, "0"),
  };

  return (
    <div className={classes.result}>
      <div className={classes.info}>
        <div>{`${buyDay.year}-${buyDay.month}-${buyDay.date}`}</div>
        <div className={classes.buyPrice}>{`$${buy.price}`}</div>
      </div>
      <div className={classes.info}>${profit}</div>
      <div className={classes.info}>
        <div>{`${sellDay.year}-${sellDay.month}-${sellDay.date}`}</div>
        <div className={classes.sellPrice}>{`$${sell.price}`}</div>
      </div>
    </div>
  );
};

export default StockTradeInfo;
