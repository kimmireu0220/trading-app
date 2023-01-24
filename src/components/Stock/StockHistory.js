import Card from "../UI/Card";

import classes from "./StockHistory.module.css";

const StockHistory = ({ historyConfig }) => {
  const { days, opens, highs, lows, closes, volumes } = historyConfig;

  return (
    <Card>
      <p className={classes.current}>( Current : USD )</p>
      <div className={classes.container}>
        <ul className={classes.history}>
          <div className={classes.title}>Date</div>
          {days.map((day, index) => (
            <li key={index}>{day}</li>
          ))}
        </ul>
        <ul className={classes.history}>
          <div className={classes.title}>Open</div>
          {opens.map((open, index) => (
            <li key={index}>{Number(open).toFixed(2)}</li>
          ))}
        </ul>
        <ul className={classes.history}>
          <div className={classes.title}>High</div>
          {highs.map((high, index) => (
            <li key={index}>{Number(high).toFixed(2)}</li>
          ))}
        </ul>
        <ul className={classes.history}>
          <div className={classes.title}>Low</div>
          {lows.map((low, index) => (
            <li key={index}>{Number(low).toFixed(2)}</li>
          ))}
        </ul>
        <ul className={classes.history}>
          <div className={classes.title}>Close</div>
          {closes.map((close, index) => (
            <li key={index}>{Number(close).toFixed(2)}</li>
          ))}
        </ul>
        <ul className={classes.history}>
          <div className={classes.title}>Volume</div>
          {volumes.map((volume, index) => (
            <li key={index}>{Number(volume).toLocaleString()}</li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default StockHistory;
