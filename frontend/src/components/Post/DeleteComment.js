import React, { useContext, useState, useEffect } from "react";
import { UidContext } from "../AppContext";
import commentReducer from "../../reducers/comment.reducer";
import { useDispatch } from "react-redux";
import { deleteComment, editComment } from "../../actions/comment.actions";
import userReducer from "../../reducers/user.reducer";
import { useSelector } from "react-redux";

const DeleteComment = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);

  const userData = useSelector((state) => state.userReducer);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();
    setEdit(false);
  };

  const handleDelete = () => {
    dispatch(deleteComment(comment.id));
    setEdit(false);
  };

  useEffect(() => {
    const checkAuthor = () => {
      if (uid == comment.users_id || userData.is_admin === true)
        setIsAuthor(true);
    };
    checkAuthor();
  }, []);

  return (
    <div className="edit-comment">
      {isAuthor && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./img/icons/edit.svg" />
        </span>
      )}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <div className="btn">
            <span
              onClick={() => {
                if (window.confirm("Voulez-vous supprimer ce commentaire?")) {
                  handleDelete();
                }
              }}>
              <img src="./img/icons/trash.svg" alt="delete" />
            </span>
          </div>
        </form>
      )}
    </div>
  );
};

export default DeleteComment;
