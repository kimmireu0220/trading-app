import React from "react";

import classes from "./StockNavigation.module.css";

type Props = {
  menu: string;
  onSelect: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const StockNavigation: React.FC<Props> = ({ menu, onSelect }) => {
  return (
    <nav className={classes.nav}>
      <ul className={classes.ul}>
        <li>
          <button
            className={menu === "chart" ? "bold" : undefined}
            onClick={onSelect}
            value="chart"
          >
            Chart
          </button>
        </li>
        <li>
          <button
            className={menu === "conversations" ? "bold" : undefined}
            onClick={onSelect}
            value="conversations"
          >
            Conversations
          </button>
        </li>
        <li>
          <button
            className={menu === "statistics" ? "bold" : undefined}
            onClick={onSelect}
            value="statistics"
          >
            Statistics
          </button>
        </li>
        <li>
          <button
            className={menu === "history" ? "bold" : undefined}
            onClick={onSelect}
            value="history"
          >
            History
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default StockNavigation;
