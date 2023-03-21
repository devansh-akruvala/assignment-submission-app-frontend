import React from "react";
import { useUser } from "../Contexts/UserProvider";
import jwt_decode from "jwt-decode";
const CommentItem = (props) => {
  const { comment, emitDeleteComment, emitEditComment } = props;
  const user = useUser();
  const decodedJwt = jwt_decode(user.jwt);
  return (
    <div className="comment-bubble">
      <div className="d-flex gap-4" style={{ fontWeight: "bold" }}>
        <div>{`${comment.createdBy.username}`}</div>
        {decodedJwt.sub === comment.createdBy.username ? (
          <>
            {" "}
            <div
              onClick={() => {
                emitEditComment(comment.id);
              }}
              style={{ cursor: "pointer", color: "blue" }}
            >
              Edit
            </div>
            <div
              onClick={() => {
                emitDeleteComment(comment.id);
              }}
              style={{ cursor: "pointer", color: "red" }}
            >
              Delete
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div>{comment.text}</div>
    </div>
  );
};

export default CommentItem;
