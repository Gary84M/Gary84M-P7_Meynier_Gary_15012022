import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import { addComment, getComments } from "../../actions/comment.actions";
import { getPosts } from "../../actions/post.actions";
import DeleteComment from "./DeleteComment";

const CardComments = ({ post }) => {
  const [text, setText] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const comments = useSelector((state) => state.commentReducer.rows);
  const posts = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(
        addComment(
          post.id,
          userData.id,
          text,
          userData.first_name,
          userData.last_name
        )
      )
        .then(() => dispatch(getComments()))
        .then(() => setText(""));
    }
  };
  var comm = [];
  const commentPostId =
    comments &&
    comments.filter((el) => {
      const a = parseInt(el.post_id);

      if (el.post_id == post.id) {
        comm.push(el);
      }
    });

  console.table(comm);

  const postId = posts.map((el) => {
    const postId = parseInt(el.id);

    return postId;
  });

  const commentContent =
    comments &&
    comments.map((el) => {
      const commentContent = el.content;
      return commentContent;
    });

  const mapComments = () => {
    //console.log(commentPostId + post.id);
    comments.map((comment) => {
      if (post.id === commentPostId) {
        return comment.content;
      }
    });
  };
  console.log(commentPostId);

  return (
    <div className="comments-container">
      {comm?.map((comment) => {
        return (
          <div
            className={
              comment.users_id === userData.id
                ? "comment-container client"
                : "comment-container"
            }
            key={comment.id}>
            <div className="left-part">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user.id === comment.users_id) return user.image;
                      else return null;
                    })
                    .join("")
                }
                alt="commenter-pic"
              />
            </div>
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo">
                  <h3>{comment.first_name + " " + comment.last_name}</h3>
                </div>
              </div>
              <p>{comment.content}</p>;
              <DeleteComment comment={comment} postId={post.id} />
            </div>
          </div>
        );
      })}

      {userData.id && (
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Laisser un commentaire"
          />
          <br />
          <input type="submit" value="Envoyer" />
        </form>
      )}
    </div>
  );
};

export default CardComments;
