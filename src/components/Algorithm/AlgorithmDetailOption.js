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
      <Fragment>
        <Link className="float--right mt-5" to="/algorithms">
          Back to list
        </Link>
      </Fragment>
    </Fragment>
  );
};

export default AlgorithmDetailOption;
