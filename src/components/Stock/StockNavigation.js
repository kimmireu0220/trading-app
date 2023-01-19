import classes from "./StockNavigation.module.css";

const StockNavigation = (props) => {
  return (
    <nav>
      <ul className={classes.ul}>
        <li>
          <button onClick={props.onSelect} value="chart">
            Chart
          </button>
        </li>
        <li>
          <button onClick={props.onSelect} value="conversations">
            Conversations
          </button>
        </li>
        <li>
          <button onClick={props.onSelect} value="statistics">
            Statistics
          </button>
        </li>
        <li>
          <button onClick={props.onSelect} value="history">
            History
          </button>
        </li>
        <li>
          <button onClick={props.onSelect} value="financials">
            Financials
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default StockNavigation;
