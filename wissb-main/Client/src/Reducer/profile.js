import {
  GET_PROFILE,
  CLEAR_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from "../Action/Types";

const initialState = {
  profile: {},
  profiles: [],
  loading: true,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
        error: null,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
        error: null,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
        error: payload,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        profiles: null,
        profile: null,
        loading: false,
        error: payload,
      };

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: [],
        error: null,
      };

    default:
      return state;
  }
}
