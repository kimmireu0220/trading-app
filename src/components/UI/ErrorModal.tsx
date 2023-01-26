import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

type Props = {
  title: string;
  message: string | null;
  onConfirm: () => void;
};

const Backdrop: React.FC<{ onConfirm: () => void }> = (props) => (
  <div className={classes.backdrop} onClick={props.onConfirm} />
);

const ErrorModalOverlay: React.FC<Props> = (props) => {
  return (
    <div className={`${classes.modal} ${classes.ModalOpen}`}>
      <header className={classes.header}>
        <h2 className={classes.title}>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.message}</p>
      </div>
      <ul className={classes.actions}>
        <li>
          <button className="btn" onClick={props.onConfirm}>
            Okay
          </button>
        </li>
      </ul>
    </div>
  );
};

const ErrorModal: React.FC<Props> = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        (document.getElementById("backdrop-root") as HTMLElement) || null
      )}
      {ReactDOM.createPortal(
        <ErrorModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("overlay-root") as HTMLElement
      )}
    </Fragment>
  );
};

export default ErrorModal;
