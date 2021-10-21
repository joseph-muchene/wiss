import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPost, updateLikes, removelike, removePost } from "../Action/Post";
import { useEffect } from "react";
import Like from "../static/thumbs-up.svg";
import Unlike from "../static/thumbs-down.svg";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import { isAuthenticated } from "../Action/Auth";
const Postcomponent = ({
  getPost,
  match,
  post,
  errors,
  updateLikes,
  removelike,
  removePost,
}) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);
  const { data } = isAuthenticated();

  // const compare = post.postedBy._id === data.user._id;
  const postedBy = post.postedBy && post.postedBy._id;
  const user = data.user && data.user._id;

  const showErrors = () => (
    <div
      className="alert alert-danger alert-dismissible fade show m-4"
      role="alert"
    >
      <strong>{errors}</strong>
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="close"
      >
        <span aria-label="true">&times;</span>
      </button>
    </div>
  );

  return (
    <div>
      <div class="container">
        <h1 class="my-4 display-4 text-center text-capitalize">{post.title}</h1>
        {post.photo && (
          <img
            src={`http://localhost:8000/api/posts/photo/${
              post._id && post._id
            }`}
            alt=""
            srcset=""
            class="img-fluid img-post"
          />
        )}
        {errors && showErrors()}
        <div className="likes">
          <img
            src={Like}
            alt="like"
            srcset=""
            onClick={(e) => {
              updateLikes({
                postId: post._id && post._id,
              });
            }}
            class="mr-4 fa fa-like"
          />

          <img
            src={Unlike}
            alt="unlike"
            srcset=""
            onClick={(e) => {
              removelike({
                postId: post._id && post._id,
              });
            }}
            class="fa fa-like mr-4"
          />
        </div>

        <span class="badge badge-pill badge-primary">
          {post.likes && post.likes.length}
        </span>
        <div class="container my-4">
          <p class="lead text-break">{post.body}</p>
          <div class="my-5">
            <p>
              posted by
              <span class="text-primary">
                {" "}
                <a href={`/profile/read/${post.postedBy && post.postedBy._id}`}>
                  {" "}
                  {post.postedBy && post.postedBy.name}
                </a>
              </span>{" "}
              on <Moment format="YYYY/MM/DD">{post.created}</Moment>
            </p>
          </div>

          {user === postedBy && (
            <div className="btn-group mb-4">
              <button type="button" className="btn btn-primary">
                <a href="/new/post" className="text-white">
                  CREATE POST
                </a>
              </button>
              <button
                type="button"
                className=" btn btn-danger"
                onClick={() => {
                  removePost(post._id);
                  window.location = "/";
                }}
              >
                DELETE POST
              </button>
              <button type="button" className=" btn btn-info">
                <Link to={`/Edit/post/${post._id}`} className="text-white">
                  EDIT POST
                </Link>
              </button>
            </div>
          )}
          <Comments
            postId={post._id && post._id}
            post={post && post}
            userId={data.user && data.user._id}
            datePosted={post.comments && post.comments.created}
            comments={post.comments && post.comments}
          />
        </div>
        <hr />
      </div>
    </div>
  );
};
Postcomponent.propTypes = {
  getPost: PropTypes.func.isRequired,
  removePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  removelike: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.Post.post,
  errors: state.Post.error,
});

export default connect(mapStateToProps, {
  getPost,
  removePost,
  updateLikes,
  removelike,
})(Postcomponent);
