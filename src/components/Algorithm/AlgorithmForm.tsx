import React, { useState, Fragment, createRef } from "react";
import { useNavigate } from "react-router";

import ConfirmModal from "../UI/ConfirmModal";
import ErrorModal from "../UI/ErrorModal";
import Card from "../UI/Card";

import Algorithm from "../../models/algorithm";

import classes from "./AlgorithmForm.module.css";

type Props = {
  action: string;
  onAddAlgorithm?: (algorithmData: Algorithm) => void;
  onEditAlgorithm?: (algorithmData: Algorithm) => void;
  algorithmId?: string;
  algorithmConfig?: Algorithm;
};

const AlgorithmForm: React.FC<Props> = (props) => {
  const {
    action,
    onAddAlgorithm,
    onEditAlgorithm,
    algorithmId,
    algorithmConfig,
  } = props;

  let title, buyAlgorithm, buyTarget, sellAlgorithm, sellTarget, description;

  if (algorithmConfig) {
    title = algorithmConfig.title;
    buyAlgorithm = algorithmConfig.buyAlgorithm;
    buyTarget = algorithmConfig.buyTarget;
    sellAlgorithm = algorithmConfig.sellAlgorithm;
    sellTarget = algorithmConfig.sellTarget;
    description = algorithmConfig.description;
  }

  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formIsValid, setFormIsVallid] = useState(false);

  const titleInputRef = createRef<HTMLInputElement>();
  const buyTargetInutRef = createRef<HTMLInputElement>();
  const buyAlgorithmInputRef = createRef<HTMLSelectElement>();
  const sellTargetInputRef = createRef<HTMLInputElement>();
  const sellAlgorithmInputRef = createRef<HTMLSelectElement>();
  const descriptionInputRef = createRef<HTMLTextAreaElement>();

  const cancelHandler = () => navigate(-1);

  const closeErrorModalHandler = () => setIsSubmitted(false);

  const toggleShowConfirmHandler = () =>
    setShowConfirm((prevState) => !prevState);

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);

    const title = titleInputRef.current!.value;
    const buyAlgorithm = buyAlgorithmInputRef.current!.value;
    const buyTarget = buyTargetInutRef.current!.value;
    const sellAlgorithm = sellAlgorithmInputRef.current!.value;
    const sellTarget = sellTargetInputRef.current!.value;
    const description = descriptionInputRef.current!.value;

    title &&
    buyAlgorithm &&
    buyTarget &&
    sellAlgorithm &&
    sellTarget &&
    description
      ? setFormIsVallid(true)
      : setFormIsVallid(false);

    if (action === "edit" && formIsValid && isSubmitted) {
      onEditAlgorithm!({
        title,
        buyAlgorithm,
        buyTarget,
        sellAlgorithm,
        sellTarget,
        description,
        algorithmId,
      });
    }

    if (action === "add" && formIsValid && isSubmitted) {
      onAddAlgorithm!({
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
    <Fragment>
      <div className={classes.wrapper}>
        <Card>
          <form className={classes.form} onSubmit={submitFormHandler}>
            <div className={classes.control}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                ref={titleInputRef}
                defaultValue={action === "edit" ? title : undefined}
              />
            </div>
            <div className={classes.trading_algorithm}>Trading Algorithm</div>
            <div className={classes.logicControl}>
              <div className={classes.signal}>
                <label className={classes.buy} htmlFor="buyAlgorithm">
                  Buy Algorithm
                </label>
                <select
                  id="buyAlgorithm"
                  ref={buyAlgorithmInputRef}
                  defaultValue={action === "edit" ? buyAlgorithm : undefined}
                >
                  <option value="Price">Price</option>
                </select>
                <label className={classes.buy} htmlFor="buyTarget">
                  Buy Target
                </label>
                <input
                  id="buyTarget"
                  type="number"
                  ref={buyTargetInutRef}
                  defaultValue={action === "edit" ? buyTarget : undefined}
                />
              </div>
              <div className={classes.signal}>
                <label className={classes.sell} htmlFor="sellAlgorithm">
                  Sell Algorithm
                </label>
                <select
                  id="sellAlgorithm"
                  ref={sellAlgorithmInputRef}
                  defaultValue={action === "edit" ? sellAlgorithm : undefined}
                >
                  <option value="Price">Price</option>
                </select>
                <label className={classes.sell} htmlFor="sellTarget">
                  Sell Target
                </label>
                <input
                  id="sellTarget"
                  type="number"
                  ref={sellTargetInputRef}
                  defaultValue={action === "edit" ? sellTarget : undefined}
                />
              </div>
            </div>
            <div className={classes.control}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows={5}
                ref={descriptionInputRef}
                defaultValue={action === "edit" ? description : undefined}
              />
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
                {action === "edit" ? "Edit" : "Add"}
              </button>
            </div>
          </form>
        </Card>
      </div>
      <ConfirmModal
        show={showConfirm}
        title={
          action === "edit"
            ? "Do you want to stop editting this algorithm?"
            : "Do you want to stop adding this algorithm?"
        }
        message={
          action === "edit"
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
    </Fragment>
  );
};

export default AlgorithmForm;
