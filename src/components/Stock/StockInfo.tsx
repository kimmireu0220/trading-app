import React from "react";
import Card from "../UI/Card";

import classes from "./StockInfo.module.css";

type Props = {
  ticker: string;
  name: string;
  price: number;
  change: number;
};

const StockInfo: React.FC<Props> = (props) => {
  const { ticker, name, price, change } = props;

  return (
    <Card>
      <h1>{`${name} (${ticker})`}</h1>
      <div>
        <span className={classes.price}>{`$${price} `}</span>
        <span
          className={change > 0 ? classes.up : classes.down}
        >{`(${change}%)`}</span>
      </div>
    </Card>
  );
};

export default StockInfo;
