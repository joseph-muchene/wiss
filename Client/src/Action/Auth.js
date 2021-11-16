import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../Action/Types";

export const isAuthenticated = () => {
  //check for token
  if (typeof window === "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};
export const loadUser = () => async (dispatch) => {
  const { data } = isAuthenticated();
  try {
    const res = await axios.get(
      `/api/users/read/${data.user._id}`
    );
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const Registeruser = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(formData);
  try {
    const res = await axios.post(
      "/api/register",
      body,
      config
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.error,
    });
  }
};

export const signin = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(formData);
  try {
    const res = await axios.post(
      "/api/login",
      body,
      config
    );
    authenticate(res, () => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    });
    dispatch(loadUser);
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.error,
    });
  }
};

export const signout = () => async (dispatch) => {
  try {
    await axios.get("/api/signout");
    dispatch({
      type: LOGOUT,
    });
  } catch (err) {
    console.log(err.response);
  }
};
