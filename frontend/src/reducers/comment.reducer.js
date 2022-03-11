import { GET_COMMENTS, DELETE_COMMENT } from "../actions/comment.actions";
import { getPosts } from "../actions/post.actions";

const initialState = {};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return action.payload;

    case DELETE_COMMENT:
      return {
        comments: state.comments.filter(
          (comment) => comment.id !== action.payload.commentId
        ),
      };
      return getPosts;

    default:
      return state;
  }
}

//             case 'DELETE_HOSTNAME':
//             return state.filter(hostname =>
//                 hostname.id !== action.hostnameId
//             )

//             case 'DELETE_HOSTNAME':
//   return { hostnames: state.hostnames.filter(hostname =>
//      hostname.id !== action.hostnameId
//   )}
