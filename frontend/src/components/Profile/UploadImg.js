import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";
import userReducer from "../../reducers/user.reducer";
import { UidContext } from "../AppContext";

const UploadImg = () => {
  const [file, setFile] = useState();
  const uid = useContext(UidContext);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    //data.append("name", "TEST");
    data.append("id", userData.id);
    data.append("file", file);

    console.log(JSON.stringify(Object.fromEntries(data)));
    dispatch(uploadPicture(data, userData.id));
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <label htmlFor="file">Changer l'image</label>
      <input
        type="file"
        id="file"
        name="file"
        accept=",jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files)}
      />
      <br />
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default UploadImg;
