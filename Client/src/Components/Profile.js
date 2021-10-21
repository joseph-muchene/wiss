import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import Moment from "react-moment";
import P from "../static/profile-pic.png";
import { read, removeProfile } from "../Action/Profile";
import { TruncateBody } from "../helpers/Truncate";
import { isAuthenticated } from "../Action/Auth";
import { useEffect } from "react";
import { postByUser } from "../Action/Post";
const Profile = ({
  read,
  match,
  profile,
  removeProfile,
  postByUser,
  posts,
}) => {
  useEffect(() => {
    read(match.params.id);
  }, [match.params.id]);

  useEffect(() => {
    postByUser(match.params.id);
  }, [postByUser, match.params.id]);

  const removeUser = () => {
    alert(
      "Are you sure you want to delete your Account!!. This action cannot be undone "
    );
    removeProfile();
    window.location = "/";
  };

  const { data } = isAuthenticated();

  return (
    <div>
      <div className="container">
        <h1 className="my-4 text-center">Profile</h1>

        <div className="profile__content">
          <div className="row">
            <div className="col-sm">
              {profile && profile.photo ? (
                <img
                  className="img-fluid"
                  alt=""
                  src={`http://localhost:8000/api/user/photo/${match.params.id}`}
                />
              ) : (
                <img className="img-fluid img__card" src={P} alt="" />
              )}
            </div>
            <div className="col-sm ml-4 mt-4">
              <p>
                {match.params.id !== data.user._id ? "Name" : "WELCOME"}{" "}
                <span className="text-primary">{profile && profile.name}</span>
              </p>
              <p>
                Email: <span>{profile.email}</span>
              </p>
              <p>
                Joined on{" "}
                <span>
                  <Moment format="YYYY/MM/DD">{profile.created}</Moment>
                </span>
              </p>
            </div>
          </div>
          {match.params.id !== data.user._id ? null : (
            <div className="my-4">
              <button type="button" className="btn btn-primary m-4">
                <Link className="text-white" to="/new/post">
                  CREATE POST
                </Link>
              </button>
              <button type="button" className="btn btn-info m-4">
                <Link
                  className="text-white"
                  to={`/edit/profile/${profile._id}`}
                >
                  EDIT PROFILE
                </Link>
              </button>
              <button
                type="button"
                className="btn btn-danger m-4 "
                onClick={(e) => {
                  removeUser();
                }}
              >
                DELETE ACCOUNT
              </button>
            </div>
          )}{" "}
          <div className="container m-4">
            <h3>About Me</h3>
            <hr />
            <div className="row">
              <div className="col-sm-8">
                <p className="lead">
                  {profile.about ? (
                    profile.about
                  ) : (
                    <h5 className=" text-info">No About For This User</h5>
                  )}
                </p>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm">
              <h3 className="text-center">
                Posts
                <span className="badge badge-primary ml-4">{posts.length}</span>
              </h3>

              {posts.map((post) => (
                <div className="post__content">
                  <div className="container">
                    <h4 className="my-4">{post.title}</h4>
                    <p className="lead">
                      {ReactHtmlParser(TruncateBody(post.body, 30))}
                    </p>
                    <button className="btn btn-link ">
                      <a href={`/read/more/${post._id}`}>Read more</a>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
Profile.propTypes = {
  read: PropTypes.func.isRequired,
  removeProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  postByUser: PropTypes.func.isRequired,
};
const mapStateToprops = (state) => ({
  profile: state.Profile.profile,
  posts: state.Post.posts,
});

export default connect(mapStateToprops, { read, removeProfile, postByUser })(
  Profile
);
