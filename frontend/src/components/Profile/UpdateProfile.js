import React from "react";
import LeftNav from "../LeftNav";
import { useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import userReducer from "../../reducers/user.reducer";

const UpdateProfile = () => {
  const userData = useSelector((state) => state.userReducer);
  let profilePicture = userData && userData.image;

  return (
    <div className="profil-container">
      <LeftNav />
      <h1>Profil de {userData.first_name}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img
            src="/Users/garymeynier/CODE/OC-P/P7/P7_Meynier_Gary_15012022/backend/public/upload/profile/tof7.jpg"
            alt="user"
          />
          <UploadImg />
          {/* <p>{errors.maxSize}</p>
          <p>{errors.format}</p> */}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
