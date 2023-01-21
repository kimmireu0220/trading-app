import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import ConfirmModal from "../UI/ConfirmModal";
import ErrorModal from "../UI/ErrorModal";
import Card from "../UI/Card";

import classes from "./AlgorithmForm.module.css";

const AlgorithmForm = (props) => {
  const history = useHistory();

  const { algorithmId } = props;

  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formIsValid, setFormIsVallid] = useState(false);

  const titleInputRef = useRef();
  const buyTargetInutRef = useRef();
  const buyAlgorithmInputRef = useRef();
  const sellTargetInputRef = useRef();
  const sellAlgorithmInputRef = useRef();
  const descriptionInputRef = useRef();

  const cancelHandler = () => history.goBack();

  const closeErrorModalHandler = () => setIsSubmitted(false);

  const toggleShowConfirmHandler = () =>
    setShowConfirm((prevState) => !prevState);

  const submitFormHandler = (event) => {
    event.preventDefault();
    setIsSubmitted(true);

    const title = titleInputRef.current.value;
    const buyTarget = buyTargetInutRef.current.value;
    const buyAlgorithm = buyAlgorithmInputRef.current.value;
    const sellTarget = sellTargetInputRef.current.value;
    const sellAlgorithm = sellAlgorithmInputRef.current.value;
    const description = descriptionInputRef.current.value;

    title &&
    buyAlgorithm &&
    buyTarget &&
    sellAlgorithm &&
    sellTarget &&
    description
      ? setFormIsVallid(true)
      : setFormIsVallid(false);

    if (props.action === "edit" && formIsValid && isSubmitted) {
      props.onEditAlgorithm({
        title,
        buyAlgorithm,
        buyTarget,
        sellAlgorithm,
        sellTarget,
        description,
        algorithmId,
      });
    }

    if (props.action === "add" && formIsValid && isSubmitted) {
      props.onAddAlgorithm({
        title,
        buyAlgorithm,
        buyTarget,
        sellAlgorithm,
        sellTarget,
        description,
      });
    }
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={submitFormHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            ref={titleInputRef}
            defaultValue={props.action === "edit" ? props.title : undefined}
          />
        </div>
        <div className={classes.logicControl}>
          <div className={classes.signal}>
            <label htmlFor="buy">Buy</label>
            <select
              ref={buyAlgorithmInputRef}
              defaultValue={
                props.action === "edit" ? props.buyAlgorithm : undefined
              }
            >
              <option value="price">Price</option>
            </select>
            <input
              type="number"
              ref={buyTargetInutRef}
              defaultValue={
                props.action === "edit" ? props.buyTarget : undefined
              }
            />
          </div>
          <div className={classes.signal}>
            <label htmlFor="sell">Sell</label>
            <select
              ref={sellAlgorithmInputRef}
              defaultValue={
                props.action === "edit" ? props.sellAlgorithm : undefined
              }
            >
              <option value="price">Price</option>
            </select>
            <input
              type="number"
              ref={sellTargetInputRef}
              defaultValue={
                props.action === "edit" ? props.sellTarget : undefined
              }
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows="5"
            ref={descriptionInputRef}
            defaultValue={
              props.action === "edit" ? props.description : undefined
            }
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button
            className={classes.cancel}
            type="button"
            onClick={toggleShowConfirmHandler}
          >
            Cancel
          </button>
          <button className={classes.action}>
            {props.action === "edit" ? "Edit" : "Add"}
          </button>
        </div>
      </form>
      <ConfirmModal
        show={showConfirm}
        title={
          props.action === "edit"
            ? "Do you want to stop editting this algorithm?"
            : "Do you want to stop adding this algorithm?"
        }
        message={
          props.action === "edit"
            ? "If you really want to stop editting , click 'Okay' button"
            : "If you really want to stop adding , click 'Okay' button"
        }
        onClose={toggleShowConfirmHandler}
        onConfirm={cancelHandler}
      />
      {!formIsValid && isSubmitted && (
        <ErrorModal
          title="Form validity error"
          message="Please fill in the blanks"
          onConfirm={closeErrorModalHandler}
        />
      )}
    </Card>
  );
};

export default AlgorithmForm;
