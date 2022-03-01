import React, { useContext } from "react";
import Log from "../Log";
import { UidContext } from "../AppContext";
import UpdateProfile from "../Profile/UpdateProfile";

const Profile = () => {
  const uid = useContext(UidContext);

  return (
    <div className="profil-page">
      {uid ? (
        <UpdateProfile />
      ) : (
        <div className="log-container">
          <Log signin={false} signup={true} />
          <div className="img-container">
            <img src="img/log.svg" alt="image login" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
