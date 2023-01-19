import classes from "./StockNavigation.module.css";

const StockNavigation = (props) => {
  return (
    <nav>
      <ul className={classes.ul}>
        <li>
          <button
            className={props.menu.toString() === "chart" ? "bold" : ""}
            onClick={props.onSelect}
            value="chart"
          >
            Chart
          </button>
        </li>
        <li>
          <button
            className={props.menu.toString() === "conversations" ? "bold" : ""}
            onClick={props.onSelect}
            value="conversations"
          >
            Conversations
          </button>
        </li>
        <li>
          <button
            className={props.menu.toString() === "statistics" ? "bold" : ""}
            onClick={props.onSelect}
            value="statistics"
          >
            Statistics
          </button>
        </li>
        <li>
          <button
            className={props.menu.toString() === "history" ? "bold" : ""}
            onClick={props.onSelect}
            value="history"
          >
            History
          </button>
        </li>
        <li>
          <button
            className={props.menu.toString() === "financials" ? "bold" : ""}
            onClick={props.onSelect}
            value="financials"
          >
            Financials
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default StockNavigation;
