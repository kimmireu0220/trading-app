import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Transition } from "react-transition-group";

import classes from "./Modal.module.css";

type ModalProps = {
  onClose: () => void;
  show: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
};

type BackdropProps = { onClose: () => void; show: boolean };

const animationTiming = {
  enter: 750,
  exit: 750,
};

const Backdrop: React.FC<BackdropProps> = (props) => {
  const { show, onClose } = props;

  if (show) return <div className={classes.backdrop} onClick={onClose} />;
  return null;
};

const ModalOverlay: React.FC<ModalProps> = (props) => {
  const { show, title, message, onClose, onConfirm } = props;
  return (
    <Transition in={show} timeout={animationTiming} unmountOnExit mountOnEnter>
      {(state) => {
        const animationClass =
          state === "entering"
            ? classes.ModalOpen
            : state === "exiting"
            ? classes.ModalClosed
            : null;

        return (
          <div className={`${classes.modal} ${animationClass} `}>
            <header className={classes.header}>
              <h2 className={classes.title}>{title}</h2>
            </header>
            <div className={classes.content}>
              <p>{message}</p>
            </div>
            <ul className={classes.actions}>
              <li>
                <button className={`btn ${classes.no}`} onClick={onClose}>
                  No
                </button>
              </li>
              <li>
                <button className="btn" onClick={onConfirm}>
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

const ConfirmModal: React.FC<ModalProps> = (props) => {
  const { show, title, message, onClose, onConfirm } = props;

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} show={show} />,
        (document.getElementById("backdrop-root") as HTMLElement) || null
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          show={show}
          title={title}
          message={message}
          onClose={onClose}
          onConfirm={onConfirm}
        />,
        document.getElementById("overlay-root") as HTMLElement
      )}
    </Fragment>
  );
};

export default ConfirmModal;
