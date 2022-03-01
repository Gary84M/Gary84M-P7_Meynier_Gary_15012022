import React from "react";
import LeftNav from "../LeftNav";
import { useSelector } from "react-redux";
import UploadImg from "./UploadImg";

const UpdateProfile = () => {
  const userData = useSelector((state) => state.useSelector);

  return (
    <div className="profil-container">
      <LeftNav />
      {/* <h1>Profil de {userData[0].first_name}</h1> */}
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          {/* <img src={userData.image} alt="user-picture" /> */}
          <UploadImg />
          {/* <p>{errors.maxSize}</p>
          <p>{errors.format}</p> */}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
