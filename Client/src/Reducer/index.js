import { combineReducers } from "redux";
import Auth from "./Auth";
import Post from "./Post";
import Profile from "./profile";
export default combineReducers({ Auth, Profile, Post });
