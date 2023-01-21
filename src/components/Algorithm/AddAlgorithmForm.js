import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import ConfirmModal from "../UI/ConfirmModal";

import classes from "./AlgorithmForm.module.css";

const AddAlgorithmForm = (props) => {
  const history = useHistory();

  const titleInputRef = useRef();
  const buyTargetInutRef = useRef();
  const sellTargetInputRef = useRef();
  const descriptionInputRef = useRef();

  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formIsValid, setFormIsVallid] = useState(false);
  const [buyAlgorithm, setBuyAlgorithm] = useState("Price");
  const [sellAlgorithm, setSellAlgorithm] = useState("Price");

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

    if (formIsValid && isSubmitted)
      props.onAddAlgorithm({
        title,
        buyAlgorithm,
        buyTarget,
        sellAlgorithm,
        sellTarget,
        description,
      });
  }

  const cancelHandler = () => history.goBack();

  const closeErrorModalHandler = () => setIsSubmitted(false);

  const toggleShowConfirmHandler = () =>
    setShowConfirm((prevState) => !prevState);

  const BuyAlgorithmChangeHandler = (event) =>
    setBuyAlgorithm(event.target.value);

  const sellAlgorithmChangeHandler = (event) =>
    setSellAlgorithm(event.target.value);

  return (
    <Card>
      <form className={classes.form} onSubmit={submitFormHandler}>
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
            onClick={toggleShowConfirmHandler}
          >
            Cancel
          </button>
          <button className={classes.add}>Add</button>
        </div>
      </form>
      <ConfirmModal
        show={showConfirm}
        title="Do you want to stop adding this algorithm?"
        message="If you really want to stop adding , click 'Okay' button"
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

export default AddAlgorithmForm;
