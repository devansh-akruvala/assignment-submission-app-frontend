import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useUser } from "../Contexts/UserProvider";
import fetchData from "../services/fetchServices";
import CommentItem from "./CommentItem";

const Comment = (props) => {
  const assignmentId = props.assignmentId;
  const user=useUser();
  const [comments, setComments] = useState([]);
  const emptyComment = {
    id: null,
    text: "",
    user: user.jwt,
    assignmentId: assignmentId,
  }
  const [comment, setComment] = useState(emptyComment);
  
  useEffect(() => {
    fetchData(
      `/api/comments?assignmentId=${assignmentId}`,
      "GET",
      user.jwt,
      null
    ).then((commentsData) => {
      setComments(commentsData);
    });
  }, []);

  const handleEditComment = (commentId) => {
    const id = comments.findIndex((comment) => comment.id === commentId);
    const commentCopy = {
      id: comments[id].id,
      text: comments[id].text,
      user:   user.jwt,
      assignmentId: assignmentId,
    };
    setComment(commentCopy);
  };

  const handleDeleteComment = (commentId) => {
    // todo: Send Delete REQ TO SERVER
    console.log("DELERED", commentId);
  };
  const submitComment = (e) => {
    if (comment.id) {
      fetchData("/api/comments", "PUT", user.jwt, comment).then(
        (commentData) => {
        const id = comments.findIndex((comment) => comment.id === commentData.id);
          const commentsCopy = [...comments];
          commentsCopy[id]=commentData;
          setComments(commentsCopy);
          setComment(emptyComment);
        }
      );
    } else {
      fetchData("/api/comments", "POST", user.jwt, comment).then(
        (commentData) => {
          const commentsCopy = [...comments];
          commentsCopy.push(commentData);
          setComments(commentsCopy);
          setComment(emptyComment);
        }
      );
    }
  };
  const updateComment = (e) => {
    const commentCopt = { ...comment };
    commentCopt.text = e.target.value;
    setComment(commentCopt);
  };
  return (
    <>
      <div className="mt-5">
        <textarea
          onChange={updateComment}
          value={comment.text}
          style={{ width: "100%", borderRadius: "0.5em" }}
        >
          {" "}
        </textarea>
        <Button onClick={submitComment}>Post Comment</Button>
      </div>
      <div className="mt-5">
        {comments.map((comment) => (
          <CommentItem
            comment={comment}
            emitDeleteComment={handleDeleteComment}
            emitEditComment={handleEditComment}
          />
        ))}
      </div>
    </>
  );
};

export default Comment;