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
          <button onClick={props.onSelect} value="conversation">
            Conversations
          </button>
        </li>
        <li>
          <button onClick={props.onSelect} value="statistics">
            Statistics
          </button>
        </li>
        <li>
          <button onClick={props.onSelect} value="historical_data">
            Historical Data
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
