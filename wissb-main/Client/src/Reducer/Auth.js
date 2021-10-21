import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  AUTH_ERROR,
  USER_LOADED,
} from "../Action/Types";

const initialState = {
  isAuthenticated: false,
  loading: true,
  user: {},
  errors: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        loading: false,

        isAuthenticated: true,
        user: payload,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,

        user: payload,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: payload,
      };

    case REGISTER_FAIL:
      return {
        ...state,
        user: null,
        loading: false,
        errors: payload,
      };

    case LOGIN_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem("jwt");
      return {
        ...state,
        loading: false,
        errors: payload,
        isAuthenticated: false,
      };
    case LOGOUT:
      localStorage.removeItem("jwt");
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
}
