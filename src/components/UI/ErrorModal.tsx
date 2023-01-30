import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

type ModalProps = {
  title: string;
  message: string | null;
  onConfirm: () => void;
};

const Backdrop: React.FC<{ onConfirm: () => void }> = ({ onConfirm }) => (
  <div
    className={classes.backdrop}
    onClick={onConfirm}
    data-testid="test-backdrop"
  />
);

const ErrorModalOverlay: React.FC<ModalProps> = (props) => {
  const { title, message, onConfirm } = props;

  return (
    <div className={`${classes.modal} ${classes.ModalOpen}`}>
      <header className={classes.header}>
        <h2 className={classes.title}>{title}</h2>
      </header>
      <div className={classes.content}>
        <p>{message}</p>
      </div>
      <ul className={classes.actions}>
        <li>
          <button className="btn" onClick={onConfirm}>
            Okay
          </button>
        </li>
      </ul>
    </div>
  );
};

const ErrorModal: React.FC<ModalProps> = (props) => {
  const { onConfirm, title, message } = props;

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={onConfirm} />,
        (document.getElementById("backdrop-root") as HTMLElement) || null
      )}
      {ReactDOM.createPortal(
        <ErrorModalOverlay
          title={title}
          message={message}
          onConfirm={onConfirm}
        />,
        document.getElementById("overlay-root") as HTMLElement
      )}
    </Fragment>
  );
};

export default ErrorModal;
