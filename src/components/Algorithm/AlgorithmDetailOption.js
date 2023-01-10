import { Fragment } from "react";
import { Link } from "react-router-dom";
import classes from "./AlgorithmDetailOption.module.css";

const AlgorithmDetailOption = (props) => {
  return (
    <Fragment>
      <div className={classes.buttons}>
        <button className={classes.edit} onClick={props.onGoToEdit}>
          Edit
        </button>
        <button className={classes.delete} onClick={props.onToggle}>
          Delete
        </button>
      </div>
      <div className={classes.link}>
        <Link className="float--right" to="/algorithms">
          Back to list
        </Link>
      </div>
    </Fragment>
  );
};

export default AlgorithmDetailOption;
