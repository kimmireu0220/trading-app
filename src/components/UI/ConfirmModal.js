import { Fragment } from "react";
import ReactDOM from "react-dom";
import { Transition } from "react-transition-group";

import classes from "./Modal.module.css";

const animationTiming = {
  enter: 750,
  exit: 500,
};

const Backdrop = (props) => {
  if (props.show) {
    return <div className={classes.backdrop} onClick={props.onClose} />;
  }
};

const ModalOverlay = (props) => {
  return (
    <Transition
      in={props.show}
      timeout={animationTiming}
      unmountOnExit
      mountOnEnter
    >
      {(state) => {
        const animationClass = state === "exiting" ? classes.ModalClosed : null;

        return (
          <div className={`${classes.modal} ${animationClass} `}>
            <header className={classes.header}>
              <h2>{props.title}</h2>
            </header>
            <div className={classes.content}>
              <p>{props.message}</p>
            </div>
            <ul className={classes.actions}>
              <li>
                <button className={`btn ${classes.no}`} onClick={props.onClose}>
                  No
                </button>
              </li>
              <li>
                <button className="btn" onClick={props.onConfirm}>
                  Okay
                </button>
              </li>
            </ul>
          </div>
        );
      }}
    </Transition>
  );
};

const ConfirmModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} show={props.show} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          show={props.show}
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
