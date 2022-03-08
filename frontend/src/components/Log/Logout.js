import React from "react";
import axios from "axios";
import cookie from "js-cookie";

const Logout = () => {
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };
  const logout = async () => {
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/users/refresh_token`,
      withCredentials: true,
    })
      .then(() => removeCookie("refresh_token"))
      .catch((error) => console.log(error));

    window.location = "/profile";
  };

  return (
    <li onClick={logout}>
      <img src="./img/icons/logout.svg" alt="logout" />
    </li>
  );
};

export default Logout;
