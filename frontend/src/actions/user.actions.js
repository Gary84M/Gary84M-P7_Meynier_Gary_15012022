import axios from "axios";
import cookie from "js-cookie";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const DELETE_USER = "DELETE_USER";

//const uid = useContext(UidContext);

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/users/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((error) => console.log(error));
  };
};
export const uploadPicture = (data, id) => {
  let token = document.cookie;

  let bearerToken = token.split("=")[1];

  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/users/upload`, data, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })
      .then((res) => {
        dispatch({ type: UPLOAD_PICTURE, payload: "" });
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/users/${id}`)
          .then((res) => {
            dispatch({ type: UPLOAD_PICTURE, payload: res.data.image });
          });
        console.log(res);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };
};

export const deleteUser = (id) => {
  //const token = JSON.parse(localStorage.getItem("user")).token;

  return (dispatch) => {
    const removeCookie = (key) => {
      if (window !== "undefined") {
        cookie.remove(key, { expires: 1 });
      }
    };
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/users/${id}`,
    })
      .then((res) => {
        removeCookie("refresh_token");
        dispatch({ type: DELETE_USER });
      })
      .catch((error) => error.response);
  };
};
