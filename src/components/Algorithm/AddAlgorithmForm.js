import { Fragment, useRef, useState } from "react";
import { Prompt, useHistory } from "react-router-dom";

import classes from "./AlgorithmForm.module.css";
import ErrorModal from "../UI/ErrorModal";
import Card from "../UI/Card";

const AddAlgorithmForm = (props) => {
  const history = useHistory();

  const [isEntering, setIsEntering] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formIsValid, setFormIsVallid] = useState(false);

  const [buyAlgorithm, setBuyAlgorithm] = useState("Price");
  const [sellAlgorithm, setSellAlgorithm] = useState("Price");

  const titleInputRef = useRef();
  const buyTargetInutRef = useRef();
  const sellTargetInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    setIsSubmitted(true);

    const title = titleInputRef.current.value;
    const buyTarget = buyTargetInutRef.current.value;
    const sellTarget = sellTargetInputRef.current.value;
    const description = descriptionInputRef.current.value;

    title &&
    buyAlgorithm &&
    buyTarget &&
    sellAlgorithm &&
    sellTarget &&
    description
      ? setFormIsVallid(true)
      : setFormIsVallid(false);

    if (formIsValid && isSubmitted) {
      props.onAddAlgorithm({
        title,
        buyAlgorithm,
        buyTarget,
        sellAlgorithm,
        sellTarget,
        description,
      });
    }
  }

  const formFocusedHandler = () => {
    setIsEntering(true);
  };

  const BuyAlgorithmChangeHandler = (event) => {
    setBuyAlgorithm(event.target.value);
  };

  const sellAlgorithmChangeHandler = (event) => {
    setSellAlgorithm(event.target.value);
  };

  const closeFormHandler = () => {
    history.goBack();
  };

  const finishEnteringHandler = () => {
    setIsEntering(false);
  };

  const closeModalHandler = () => {
    setIsSubmitted(false);
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
          <div className={classes.logicControl}>
            <div className={classes.signal}>
              <label htmlFor="buy">Buy</label>
              <select onChange={BuyAlgorithmChangeHandler}>
                <option value="price">Price</option>
              </select>
              <input type="number" ref={buyTargetInutRef} />
            </div>
            <div className={classes.signal}>
              <label htmlFor="sell">Sell</label>
              <select onChange={sellAlgorithmChangeHandler}>
                <option value="price">Price</option>
              </select>
              <input type="number" ref={sellTargetInputRef} />
            </div>
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
              onClick={closeFormHandler}
            >
              Cancel
            </button>
            <button className={classes.add} onClick={finishEnteringHandler}>
              Add
            </button>
          </div>
        </form>
        {!formIsValid && isSubmitted && (
          <ErrorModal
            title="Form validity error"
            message="Please fill in the blanks"
            onConfirm={closeModalHandler}
          />
        )}
      </Card>
    </Fragment>
  );
};

export default AddAlgorithmForm;
