import React from "react";
import LeftNav from "../LeftNav";
import { useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import userReducer from "../../reducers/user.reducer";

const UpdateProfile = () => {
  const userData = useSelector((state) => state.userReducer);

  return (
    <div className="profil-container">
      <LeftNav />

      <h1>Profil de {userData.first_name}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData && userData.image} alt="user" />
          <UploadImg />
          {/* <p>{errors.maxSize}</p>
          <p>{errors.format}</p> */}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
