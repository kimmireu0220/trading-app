import { Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.message}</p>
      </div>
      <footer className={classes.actions}>
        <button className={`btn ${classes.no}`} onClick={props.onClose}>
          No
        </button>
        <button className="btn" onClick={props.onConfirm}>
          Okay
        </button>
      </footer>
    </div>
  );
};

const ConfirmModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onClose={props.onClose}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default ConfirmModal;
