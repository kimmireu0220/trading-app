import { Fragment } from "react";
import { Link } from "react-router-dom";

import classes from "./AlgorithmDetailOption.module.css";

const AlgorithmDetailOption = (props) => {
  return (
    <Fragment>
      <ul className={classes.buttons}>
        <li>
          <button className={classes.edit} onClick={props.onGoToEdit}>
            Edit
          </button>
        </li>
        <li>
          <button className={classes.delete} onClick={props.onToggle}>
            Delete
          </button>
        </li>
      </ul>
      <div className={classes.link}>
        <Link className="float--right" to="/algorithms">
          Back to list
        </Link>
      </div>
    </Fragment>
  );
};

export default AlgorithmDetailOption;
