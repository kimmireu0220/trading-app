import React, { useState, Fragment, createRef } from "react";
import { useNavigate } from "react-router";

import Algorithm from "../../models/algorithm";
import ConfirmModal from "../UI/ConfirmModal";
import ErrorModal from "../UI/ErrorModal";
import Card from "../UI/Card";

import classes from "./AlgorithmForm.module.css";

type Props = {
  title?: string;
  buyAlgorithm?: string;
  buyTarget?: string;
  sellAlgorithm?: string;
  sellTarget?: string;
  description?: string;
  algorithmId: string;
  action: string;
  onAddAlgorithm: (algorithmData: {
    title: string;
    buyAlgorithm: string;
    buyTarget: string;
    sellAlgorithm: string;
    sellTarget: string;
    description: string;
  }) => void;
  onEditAlgorithm: (algorithmData: Algorithm) => void;
};

const AlgorithmForm: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  const { algorithmId } = props;

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
                defaultValue={props.action === "edit" ? props.title : undefined}
              />
            </div>
            <div className={classes.logicControl}>
              <div className={classes.signal}>
                <label className={classes.buy} htmlFor="buy">
                  Buy
                </label>
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
                <label className={classes.sell} htmlFor="sell">
                  Sell
                </label>
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
                rows={5}
                ref={descriptionInputRef}
                defaultValue={
                  props.action === "edit" ? props.description : undefined
                }
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
                {props.action === "edit" ? "Edit" : "Add"}
              </button>
            </div>
          </form>
        </Card>
      </div>
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
    </Fragment>
  );
};

export default AlgorithmForm;
