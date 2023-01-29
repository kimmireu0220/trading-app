import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import classes from "./AlgorithmDetailOption.module.css";

type Props = {
  onGoToEdit: () => void;
  onToggle: () => void;
};

const AlgorithmDetailOption: React.FC<Props> = ({ onGoToEdit, onToggle }) => {
  return (
    <Fragment>
      <ul className={classes.buttons}>
        <li>
          <button className={classes.edit} onClick={onGoToEdit}>
            Edit
          </button>
        </li>
        <li>
          <button className={classes.delete} onClick={onToggle}>
            Delete
          </button>
        </li>
      </ul>
      <Fragment>
        <Link className="float--right mt-3" to="/algorithms">
          Back to list
        </Link>
      </Fragment>
    </Fragment>
  );
};

export default AlgorithmDetailOption;
