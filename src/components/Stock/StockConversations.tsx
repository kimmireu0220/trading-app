import React, { Fragment, useEffect, createRef } from "react";
import { useSelector } from "react-redux";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";

import useHttp from "../../hooks/use-http";
import { addComment, getAllComments } from "../../lib/api";

import classes from "./StockConversations.module.css";

type Props = {
  ticker: string;
};

type Comment = {
  id: string;
  email: string;
  comment: string;
};

const StockConversations: React.FC<Props> = (props) => {
  const { ticker } = props;

  const commentInputRef = createRef<HTMLTextAreaElement>();

  const email = useSelector<{ auth: { email: string } }>(
    (state) => state.auth.email
  );

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

  const addCommentHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const comment = commentInputRef.current!.value;
    const commentData = { ticker, email, comment };

    await sendComment(commentData);
    await loadComments(ticker);
  };

  if (status === "pending") return <LoadingSpinner />;
  if (error) return <p className="centered focused">{error}</p>;

  return (
    <Fragment>
      {loadedComments.length === 0 || loadedComments.length === 1 ? (
        <p
          className={classes.comment_length}
        >{`${loadedComments.length} Comment`}</p>
      ) : (
        <p
          className={classes.comment_length}
        >{`${loadedComments.length} Comments`}</p>
      )}
      <Card>
        <ul className={classes.ul}>
          {loadedComments.map((comment: Comment) => (
            <li className={classes.li} key={comment.id}>
              <div className={classes.email}>
                {comment.email ? `${comment.email} :` : "Anon :"}
              </div>
              <div className={classes.comment}>{comment.comment}</div>
            </li>
          ))}
        </ul>
        <form onSubmit={addCommentHandler} className="centered">
          <textarea
            placeholder={email ? `${email}: ` : "Anon:"}
            ref={commentInputRef}
            rows={3}
            className={classes.textarea}
          />
          <button className={classes.enter}>Enter</button>
        </form>
      </Card>
    </Fragment>
  );
};

export default StockConversations;
