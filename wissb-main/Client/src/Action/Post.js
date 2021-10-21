import axios from "axios";
import {
  CREATE_POST,
  UPDATE_POST,
  UPDATE_LIKES,
  REMOVE_POST,
  GET_POSTS,
  GET_POST,
  REMOVE_LIKES,
  USER_POSTS,
  REMOVE_COMMENT,
  POST_ERROR,
  ADD_COMMENT,
} from "./Types";
import { isAuthenticated } from "./Auth";

const { data } = isAuthenticated();
export const createpost = (formdata) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const body = formdata;
  try {
    let res = await axios.post(
      `http://localhost:8000/api/create/new/post/${data.user._id}`,
      body,
      config
    );

    dispatch({
      type: CREATE_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.data.error,
    });
  }
};
export const updatePost = (formdata, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = formdata;
 
  try {
    let res = await axios.put(
      `http://localhost:8000/api/update/post/${id}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_POST,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: POST_ERROR,
      payload: err.response.data.error,
    });
  }
};

export const postByUser = (id) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${data.user._id}`,
    },
  };
  try {
    const res = await axios.get(
      `http://localhost:8000/api/posts/by/${!id ? data.user._id : id}`,
      config
    );
    dispatch({
      type: USER_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.data.error,
    });
  }
};
export const postfeed = () => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  };
  try {
    const res = await axios.get(
      `http://localhost:8000/api/posts/feed/${data.user._id}`,
      config
    );
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.data.error,
    });
  }
};

export const getAllposts = (pageNumber) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/posts?page=${pageNumber}`
    );
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: POST_ERROR,
    });
  }
};
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8000/api/post/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: POST_ERROR,
    });
  }
};

export const updateLikes = (FormData) => async (dispatch) => {
  const { data } = isAuthenticated();
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(FormData);
  try {
    const res = await axios.put(
      `http://localhost:8000/api/posts/like/${data.user._id}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_LIKES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.data.msg,
    });
  }
};

export const removelike = (FormData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(FormData);
  try {
    const res = await axios.put(
      `http://localhost:8000/api/posts/unlike/${data.user._id}`,
      body,
      config
    );
    const id = FormData.postId;
    dispatch({
      type: REMOVE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.data.msg,
    });
  }
};

export const Addcomment = (FormData) => async (dispatch) => {
  const { data } = isAuthenticated();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
    },
  };
  const body = JSON.stringify(FormData);
  try {
    const res = await axios.put(
      `http://localhost:8000/api/posts/comment/${data.user._id}`,
      body,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
  }
};
export const removeComment = (formData) => async (dispatch) => {
  const { data } = isAuthenticated();
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(formData);
  try {
    const res = await axios.put(
      `http://localhost:8000/api/posts/uncomment/${data.user._id}`,
      body,
      config
    );

    const id = formData.comment_id;
    dispatch({
      type: REMOVE_COMMENT,
      payload: id,
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: POST_ERROR,
    });
  }
};

export const removePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:8000/api/remove/post/${id}`);
    dispatch({
      type: REMOVE_POST,
      payload: id,
    });
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: POST_ERROR,
    });
  }
};
