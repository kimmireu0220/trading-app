import Card from "../UI/Card";

import classes from "./StockPrice.module.css";

const StockPrice = (props) => {
  return (
    <Card>
      <h1>{`${props.name} (${props.ticker})`}</h1>
      <div>
        <span>{`$${props.price} `}</span>
        <span
          className={props.change > 0 ? classes.up : classes.down}
        >{`(${props.change}%)`}</span>
      </div>
    </Card>
  );
};

export default StockPrice;
