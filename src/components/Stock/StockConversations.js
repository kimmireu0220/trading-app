import { useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import Card from "../UI/Card";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./StockConversations.module.css";
import { addComment, getAllComments } from "../../lib/api";

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
      {loadedComments.length === 0 && (
        <p className="centered mt-5 font-24">
          There is no comment yet. Be the first comment writer!
        </p>
      )}
      <ul className={classes.ul}>
        {loadedComments.map((comment) => (
          <li key={comment.id}>{`${comment.email} :  ${comment.comment}`}</li>
        ))}
      </ul>
      <form onSubmit={addCommentHandler} className="centered">
        <textarea
          placeholder={`${email}: `}
          s
          ref={commentInputRef}
          rows="5"
          className={classes.textarea}
        />
        <button className={classes.button}>Enter</button>
      </form>
    </Card>
  );
};

export default StockConversations;
