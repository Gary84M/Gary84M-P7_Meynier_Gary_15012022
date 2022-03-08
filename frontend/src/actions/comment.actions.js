import axios from "axios";

//comments

export const GET_COMMENTS = "GET_COMMENTS";

export const getComments = (num) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/all-comments`)
      .then((res) => {
        const array = res.data.slice(0, num);
        dispatch({ type: GET_COMMENTS, payload: array });
      })
      .catch((error) => console.log(error));
  };
};
