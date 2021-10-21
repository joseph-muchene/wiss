import {
  CREATE_POST,
  POST_ERROR,
  GET_PHOTO,
  UPDATE_LIKES,
  USER_POSTS,
  REMOVE_LIKES,
  GET_POSTS,
  GET_POST,
  ADD_COMMENT,
  REMOVE_POST,
  REMOVE_COMMENT,
} from "../Action/Types";

const initialState = {
  posts: [],
  post: {},
  loading: true,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_POST: {
      return {
        ...state,
        loading: false,
        posts: payload,
      };
    }
    case POST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case GET_PHOTO:
      return {
        ...state,
        photo: payload,
        loading: false,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
        error: null,
      };
    case USER_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
        error: null,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        post: { ...state.post, likes: payload },
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case REMOVE_LIKES:
      return {
        ...state,
        post: { ...state.post, likes: payload },
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
        error: null,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: {
          ...state,
          post: { ...state.post, comments: payload },
          loading: false,
        },
      };
    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
        error: null,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        loading: false,
        error: null,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
      };

    default:
      return state;
  }
}
