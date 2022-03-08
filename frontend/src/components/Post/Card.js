import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import { useDispatch } from "react-redux";

import userReducer from "../../reducers/user.reducer";
import { updatePost } from "../../actions/post.actions";
import DeleteCard from "./DeleteCard";
import commentReducer from "../../reducers/comment.reducer";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);

  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const comment = useSelector((state) => state.commentReducer);

  const dispatch = useDispatch();

  //console.log(comment);

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post.id, textUpdate));
    }
    setIsUpdated(false);
  };

  //console.log(post.users_id);
  //console.log(userData.id);

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
              <span></span>
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
                src={post.content}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={post.id}></iframe>
            )}

            {userData.id === post.users_id && (
              <div className="button-container">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <img src="./img/icons/edit.svg" alt="edit" />
                </div>
                <DeleteCard id={post.id} />
              </div>
            )}
            <div className="card-footer">
              <div className="comment-icon">
                <img src="./img/icons/message1.svg" alt="comment" />
                {!isEmpty(comment) &&
                  comment.map((commentById) => {
                    if (comment.id === post.id)
                      return commentById.content.length;
                  })}
              </div>
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default Card;

// {
//   !isEmpty(usersData[0]) &&
//     usersData.map((user) => {
//       if (user.id === post.users_id)
//         return user.first_name + " " + user.last_name;
//     });
// }
