import { useHistory } from "react-router-dom";
import { Fragment, useEffect, useRef, useState } from "react";

import Card from "../UI/Card";
import useHttp from "../../hooks/use-http";
import ErrorModal from "../UI/ErrorModal";
import ConfirmModal from "../UI/ConfirmModal";
import classes from "./AlgorithmForm.module.css";
import { getAllAlgorithms } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

const EditAlgorithmForm = (props) => {
  const history = useHistory();

  let algorithm;
  const { algorithmId } = props;

  const titleInputRef = useRef();
  const buyTargetInutRef = useRef();
  const sellTargetInputRef = useRef();
  const descriptionInputRef = useRef();

  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formIsValid, setFormIsVallid] = useState(false);
  const [buyAlgorithm, setBuyAlgorithm] = useState("Price");
  const [sellAlgorithm, setSellAlgorithm] = useState("Price");

  const {
    sendRequest,
    status,
    data: algorithms,
    error,
  } = useHttp(getAllAlgorithms, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (algorithms) {
    algorithm = algorithms.find((algorithm) => algorithm.id === algorithmId);
  }

  const submitFormHandler = (event) => {
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
  };

  const cancelHandler = () => {
    history.goBack();
  };

  const closeErrorModalHandler = () => {
    setIsSubmitted(false);
  };

  const toggleShowConfirmHandler = () => {
    setShowConfirm((prevState) => !prevState);
  };

  const BuyAlgorithmChangeHandler = (event) => {
    setBuyAlgorithm(event.target.value);
  };

  const sellAlgorithmChangeHandler = (event) => {
    setSellAlgorithm(event.target.value);
  };

  if (status === "pending") {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  return (
    <Fragment>
      <Card>
        <form className={classes.form} onSubmit={submitFormHandler}>
          <div className={classes.control}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              ref={titleInputRef}
              defaultValue={algorithm.title}
            />
          </div>
          <div className={classes.logicControl}>
            <div className={classes.signal}>
              <label htmlFor="buy">Buy</label>
              <select
                onChange={BuyAlgorithmChangeHandler}
                defaultValue={algorithm.buyAlgorithm}
              >
                <option value="price">Price</option>
              </select>
              <input
                type="number"
                ref={buyTargetInutRef}
                defaultValue={algorithm.buyTarget}
              />
            </div>
            <div className={classes.signal}>
              <label htmlFor="sell">Sell</label>
              <select
                onChange={sellAlgorithmChangeHandler}
                defaultValue={algorithm.sellAlgorithm}
              >
                <option value="price">Price</option>
              </select>
              <input
                type="number"
                ref={sellTargetInputRef}
                defaultValue={algorithm.sellTarget}
              />
            </div>
          </div>
          <div className={classes.control}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows="5"
              ref={descriptionInputRef}
              defaultValue={algorithm.description}
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
            <button className={classes.add}>Edit</button>
          </div>
        </form>
        <ConfirmModal
          show={showConfirm}
          title="Do you want to stop editting this algorithm?"
          message="If you really want to stop editting , click 'Okay' button"
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
    </Fragment>
  );
};

export default EditAlgorithmForm;
