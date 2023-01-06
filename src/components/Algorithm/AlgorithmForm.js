import { Fragment, useRef, useState } from "react";
import { Prompt, useHistory } from "react-router-dom";

import Card from "../UI/Card";
import classes from "./AlgorithmForm.module.css";

const AlgorithmForm = (props) => {
  const history = useHistory();

  const [isEntering, setIsEntering] = useState(false);
  const [enteredBuyAlgorithm, setEnteredBuyAlgorithm] = useState();
  const [enteredSellAlgorithm, setEnteredSellAlgorithm] = useState();

  const titleInputRef = useRef();
  const buyTargetInutRef = useRef();
  const sellTargetInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredBuyTarget = buyTargetInutRef.current.value;
    const enteredSellTarget = sellTargetInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    props.onAddAlgorithm({
      title: enteredTitle,
      buyAlgorithm: enteredBuyAlgorithm,
      buyTarget: enteredBuyTarget,
      sellAlgorithm: enteredSellAlgorithm,
      sellTarget: enteredSellTarget,
      description: enteredDescription,
    });
  }

  const formFocusedHandler = () => {
    setIsEntering(true);
  };

  const addBuyAlgorithmHandler = (event) => {
    setEnteredBuyAlgorithm(event.target.value);
  };

  const addSellAlgorithmHandler = (event) => {
    setEnteredSellAlgorithm(event.target.value);
  };

  const cancelHandler = () => {
    history.push("/algorithms");
  };

  const finishEnteringHandler = () => {
    setIsEntering(false);
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
              <select onChange={addBuyAlgorithmHandler}>
                <option value="rsi">RSI</option>
                <option value="price">Price</option>
              </select>
              <input type="number" ref={buyTargetInutRef} />
            </div>
            <div className={classes.signal}>
              <label htmlFor="sell">Sell</label>
              <select onChange={addSellAlgorithmHandler}>
                <option value="rsi">RSI</option>
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
