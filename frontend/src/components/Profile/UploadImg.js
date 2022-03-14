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
  const fileSend = document.getElementById("file")?.files[0];

  function handlePicture(e) {
    e.preventDefault();
    const data = new FormData();
    //data.append("name", "TEST");
    data.append("id", userData.id);
    data.append("file", fileSend);

    console.log(JSON.stringify(Object.fromEntries(data)));
    dispatch(uploadPicture(data, userData.id));
  }

  return (
    <form action="" className="upload-pic">
      <label htmlFor="file">Changer l'image</label>
      <input
        type="file"
        id="file"
        name="file"
        accept=",jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files)}
      />
      <br />
      <input type="submit" value="Envoyer" onClick={handlePicture} />
    </form>
  );
};

export default UploadImg;
