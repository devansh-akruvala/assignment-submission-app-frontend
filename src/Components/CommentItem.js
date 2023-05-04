import React, { useEffect, useState } from "react";
import { useUser } from "../Contexts/UserProvider";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
const CommentItem = (props) => {
  const { comment, emitDeleteComment, emitEditComment } = props;
  const user = useUser();
  const decodedJwt = jwt_decode(user.jwt);
  const [commentRelativeTime, setcommentRelativeTime] = useState("");
  useEffect(() => {
    updateCommentTime();
  }, [comment.createdDate]);

  const updateCommentTime=()=>{
    if (comment.createdDate) {
      dayjs.extend(relativeTime);
      setcommentRelativeTime(dayjs(comment.createdDate).fromNow());
    }
  }

  setInterval(() => {
    updateCommentTime();
  }, 1000*61);

  return (
    <div>
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
      <div
        style={{ marginTop: "-1.25em", marginLeft: "1em", fontSize: "15px" }}
      >
        {commentRelativeTime ? `Posted ${commentRelativeTime}` : "A"}
      </div>
    </div>
  );
};

export default CommentItem;
