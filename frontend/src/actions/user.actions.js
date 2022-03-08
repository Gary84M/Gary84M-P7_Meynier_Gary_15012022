import axios from "axios";
import Cookies from "js-cookie";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";

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
  console.log(document.cookie);
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/users/upload`, data, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOSIsImZpcnN0X25hbWUiOiJqb2pvIiwiZW1haWwiOiJqb2pvLmdvb2RpZXNAZ21haWwuY29tIiwiaWF0IjoxNjQ2Njc0MzI5LCJleHAiOjE2NDY3NjA3Mjl9.oaEafSKMNVneEknMCfL3K-qjIDlf6Z007TAV2AUuGNE`,
        },
      })
      .then((res) => {
        dispatch({ type: UPLOAD_PICTURE, payload: res.data.image });
        console.log(res);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };
};
