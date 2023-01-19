import { useRef } from "react";
import { useEffect } from "react";

import Card from "../UI/Card";
import useHttp from "../../hooks/use-http";
import { addComment, getAllComments } from "../../lib/api";
import classes from "./StockConversations.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useSelector } from "react-redux";

const StockConversations = (props) => {
  const { ticker } = props;
  const commentInputRef = useRef();
  const email = useSelector((state) => state.auth.email);

  const { sendRequest: sendComment } = useHttp(addComment);

  const {
    sendRequest: loadComments,
    data: loadedComments,
    status,
    error,
  } = useHttp(getAllComments, true);

  useEffect(() => {
    loadComments(ticker);
  }, [loadComments, ticker]);

  const addCommentHandler = async (event) => {
    event.preventDefault();

    const comment = commentInputRef.current.value;
    const commentData = { ticker, email, comment };
    await sendComment(commentData);

    await loadComments(ticker);
  };

  if (status === "pending") {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  return (
    <Card>
      <ul>
        {loadedComments.map((comment) => (
          <li key={comment.id}>{`${comment.email} :  ${comment.comment}`}</li>
        ))}
      </ul>
      <form onSubmit={addCommentHandler} className="centered">
        <textarea ref={commentInputRef} rows="5" className={classes.textarea} />
        <button className={classes.button}>Enter</button>
      </form>
    </Card>
  );
};

export default StockConversations;
