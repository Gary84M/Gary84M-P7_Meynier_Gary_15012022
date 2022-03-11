import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../actions/user.actions";

const DeleteProfile = () => {
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteUser(userData.id));

  return (
    <div className="update-container">
      <div className="right-part">
        <h3>Pour supprimer votre compte, c'est ici</h3>
        <button
          variant="danger"
          onClick={() => {
            if (window.confirm("Voulez-vous supprimer votre profil?")) {
              handleDelete();
              window.location.href = "/";
            }
          }}>
          Supprimer son profil
        </button>
      </div>
    </div>
  );
};

export default DeleteProfile;
