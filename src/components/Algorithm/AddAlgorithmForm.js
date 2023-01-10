import { Fragment, useRef, useState } from "react";
import { Prompt, useHistory } from "react-router-dom";

import classes from "./AlgorithmForm.module.css";
import Card from "../UI/Card";

const AddAlgorithmForm = (props) => {
  const history = useHistory();

  const [isEntering, setIsEntering] = useState(false);
  const [buyAlgorithm, setBuyAlgorithm] = useState("RSI");
  const [sellAlgorithm, setSellAlgorithm] = useState("RSI");

  const titleInputRef = useRef();
  const buyTargetInutRef = useRef();
  const sellTargetInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const title = titleInputRef.current.value;
    const buyTarget = buyTargetInutRef.current.value;
    const sellTarget = sellTargetInputRef.current.value;
    const description = descriptionInputRef.current.value;

    props.onAddAlgorithm({
      title,
      buyAlgorithm,
      buyTarget,
      sellAlgorithm,
      sellTarget,
      description,
    });
  }

  const formFocusedHandler = () => {
    setIsEntering(true);
  };

  const addBuyAlgorithmHandler = (event) => {
    setBuyAlgorithm(event.target.value);
  };

  const addSellAlgorithmHandler = (event) => {
    setSellAlgorithm(event.target.value);
  };

  const cancelHandler = () => {
    history.goBack();
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

export default AddAlgorithmForm;
