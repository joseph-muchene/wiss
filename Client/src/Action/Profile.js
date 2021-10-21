import axios from "axios";
import { isAuthenticated } from "./Auth";
import {
  GET_PROFILE,
  UPDATE_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
} from "./Types";
const { data } = isAuthenticated();

export const read = (userId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get(
      `http://localhost:8000/api/users/read/${userId}`,
      config
    );
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

export const removeProfile = () => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:8000/api/user/delete/${data.user._id}`
    );
    dispatch({
      type: CLEAR_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
export const updateUser = (formData) => async (dispatch) => {
  try {
    const { data } = isAuthenticated();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = formData;
    const res = await axios.put(
      `http://localhost:8000/api/user/update/${data.user._id}`,
      body,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.data.error,
    });
  }
};
