import classes from "./StockNavigation.module.css";

const StockNavigation = (props) => {
  return (
    <nav className={classes.nav}>
      <ul className={classes.ul}>
        <li>
          <button
            className={props.menu === "chart" ? "bold" : undefined}
            onClick={props.onSelect}
            value="chart"
          >
            Chart
          </button>
        </li>
        <li>
          <button
            className={props.menu === "conversations" ? "bold" : undefined}
            onClick={props.onSelect}
            value="conversations"
          >
            Conversations
          </button>
        </li>
        <li>
          <button
            className={props.menu === "statistics" ? "bold" : undefined}
            onClick={props.onSelect}
            value="statistics"
          >
            Statistics
          </button>
        </li>
        <li>
          <button
            className={props.menu === "history" ? "bold" : undefined}
            onClick={props.onSelect}
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
