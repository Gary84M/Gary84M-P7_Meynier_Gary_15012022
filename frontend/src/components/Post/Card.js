import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import { useDispatch } from "react-redux";

import { updatePost } from "../../actions/post.actions";
import DeleteCard from "./DeleteCard";
import CardComments from "./CardComments";
import { getComments } from "../../actions/comment.actions";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const commentsData = useSelector((state) => state.commentReducer);

  const dispatch = useDispatch();

  const postId = post.id;
  // localStorage.setItem("postId", JSON.parse(postId));

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post.id, textUpdate));
    }
    setIsUpdated(false);
  };

  console.log(userData.id);
  console.log(post.users_id);
  console.log(post);
  console.log(userData.is_admin);

  useEffect(() => {
    const checkAuthor = () => {
      if (userData.id === post.users_id || userData.is_admin === true) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [userData, post]);

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={post.id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    let imgName =
                      "file:///Users/garymeynier/CODE/OC-P/P7/P7_Meynier_Gary_15012022/backend/public/upload/profile/" +
                      user.image;

                    if (user.id === post.users_id) return user.image;
                    else return null;
                  })
                  .join("")
              }
              alt="poster-pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData.map((user) => {
                      if (user.id === post.users_id)
                        return user.first_name + " " + user.last_name;
                    })}
                </h3>
              </div>
            </div>
            {isUpdated === false && <p>{post.content}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.content}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button-container">
                  <button className="btn" onClick={() => updateItem()}>
                    Valider modification
                  </button>
                </div>
              </div>
            )}
            {post.image && (
              <img src={post.image} alt="card-pic" className="card-pic" />
            )}
            {post.video && (
              <iframe
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
            )}

            {isAuthor && (
              <div className="button-container">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <img src="./img/icons/edit.svg" alt="edit" />
                </div>
                <DeleteCard id={post.id} />
              </div>
            )}
            <div className="card-footer">
              <div className="comment-icon">
                <img
                  onClick={() => setShowComments(!showComments)}
                  src="./img/icons/message1.svg"
                  alt="comment"
                  id={postId}
                />
              </div>
            </div>
            {showComments && <CardComments post={post} />}
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
