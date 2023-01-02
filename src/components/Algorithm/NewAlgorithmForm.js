import React, { Fragment, useState, useRef } from "react";

import useHttp from "../../hooks/use-http";
import { addAlgorithm } from "../../lib/api";
import classes from "./NewAlgorithmForm.module.css";

const NewAlgorithmForm = () => {
  const { sendRequest } = useHttp(addAlgorithm);

  const [showForm, setShowForm] = useState(false);

  const titleInputRef = useRef();
  const logicInputRef = useRef();
  const descriptionInputRef = useRef();

  const showFormHandler = () => {
    setShowForm((currentState) => !currentState);
  };

  const submitFormHandler = (evnet) => {
    evnet.preventDefault();

    sendRequest({
      title: titleInputRef.current.value,
      logic: logicInputRef.current.value,
      description: descriptionInputRef.current.value,
    });

    setShowForm((currentState) => !currentState);

    titleInputRef.current.value = "";
    logicInputRef.current.value = "";
    descriptionInputRef.current.value = "";
  };

  return (
    <Fragment>
      {showForm && (
        <div>
          <form className={classes.form} onSubmit={submitFormHandler}>
            <h1 className={classes.title}>New Algorithm</h1>
            <label className={classes.label} htmlFor="title">
              Title
            </label>
            <input className={classes.input} id="title" ref={titleInputRef} />
            <label className={classes.label} htmlFor="logic">
              Logic
            </label>
            <input className={classes.input} id="logic" ref={logicInputRef} />
            <label className={classes.label} htmlFor="description">
              Description
            </label>
            <input
              className={classes.input}
              id="description"
              ref={descriptionInputRef}
            />
            <button className={classes.submitButton}>Sumbit</button>
          </form>
          <button
            className={`float--right ${classes.cancelButton}`}
            onClick={showFormHandler}
          >
            Cancel
          </button>
        </div>
      )}
      {!showForm && (
        <button
          className={`centered ${classes.addButton}`}
          onClick={showFormHandler}
        >
          Add Algorithm
        </button>
      )}
    </Fragment>
  );
};

export default NewAlgorithmForm;
