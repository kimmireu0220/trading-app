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
  return (
    <Card>
      <h1>{`${props.name} (${props.ticker})`}</h1>
      <div>
        <span className={classes.price}>{`$${props.price} `}</span>
        <span
          className={props.change > 0 ? classes.up : classes.down}
        >{`(${props.change}%)`}</span>
      </div>
    </Card>
  );
};

export default StockInfo;
