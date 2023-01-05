import { Fragment, useRef, useState } from "react";
import { Prompt, useHistory } from "react-router-dom";

import Card from "../UI/Card";
import classes from "./AlgorithmForm.module.css";

const AlgorithmForm = (props) => {
  const [isEntering, setIsEntering] = useState(false);

  const titleInputRef = useRef();
  const logicInputRef = useRef();
  const descriptionInputRef = useRef();

  const history = useHistory();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredLogic = logicInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    props.onAddAlgorithm({
      title: enteredTitle,
      logic: enteredLogic,
      description: enteredDescription,
    });
  }

  const cancelHandler = () => {
    history.push("/algorithms");
  };

  const finishEnteringHandler = () => {
    setIsEntering(false);
  };

  const formFocusedHandler = () => {
    setIsEntering(true);
  };

  return (
    <Fragment>
      <Prompt
        when={isEntering}
        message={(location) => "Are you sure you want to leave?"}
      />
      <Card>
        <form
          onFocus={formFocusedHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          <div className={classes.control}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" ref={titleInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="logic">Logic</label>
            <textarea id="logic" rows="5" ref={logicInputRef}></textarea>
          </div>
          <div className={classes.control}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows="5"
              ref={descriptionInputRef}
            ></textarea>
          </div>
          <div className={classes.actions}>
            <button
              className={classes.cancel}
              type="button"
              onClick={cancelHandler}
            >
              Cancel
            </button>
            <button className={classes.add} onClick={finishEnteringHandler}>
              Add
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default AlgorithmForm;
