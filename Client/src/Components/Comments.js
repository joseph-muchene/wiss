import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Addcomment, removeComment } from "../Action/Post";
import Moment from "react-moment";
import { useState } from "react";
import { isAuthenticated } from "../Action/Auth";
const Comments = ({
  Addcomment,
  postId,
  post,
  removeComment,
  datePosted,
  comments,
}) => {
  const { data } = isAuthenticated();
  const [text, setText] = useState();
  const [comment, toggleComment] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    Addcomment({ text, postId }).then(() => {
      setText("");
    });
  };
  let length = comments && comments.length;

  return (
    <div>
      <div className="container-sm">
        <h3 className="text-left">Leave a comment</h3>

        <div className="form-group my-3">
          <form action="" onSubmit={onSubmit}>
            <textarea
              type="text"
              value={text}
              className="form-control"
              onChange={(e) => setText(e.target.value)}
              placeholder="leave a comment"
            ></textarea>
            <button className="btn btn-primary my-4">Post</button>
          </form>
        </div>

        <div className="comment__section mt-4">
          <h4 className="comm__h4">Comments</h4>
          <div>
            <span className="mb-4 badge badge-pill badge-primary">
              {length}
            </span>
          </div>
          <button
            onClick={() => toggleComment(!comment)}
            className="btn btn-outline-info"
          >
            {comment ? "Hide comments" : "show Comments"}
          </button>
          {comment && (
            <div>
              {length > 0
                ? comments.map((c) => (
                    <div>
                      <div className="mr-4">
                        <img
                          src={`/api/user/photo/${
                            c && c.user
                          }`}
                          alt=""
                          className="p-2 comm__img "
                        />
                      </div>

                      <p className="text-break bold mt-3 mb-4 ">
                        {c.text && c.text}
                      </p>

                      <p className="">
                        posted by{"  "}
                        <span className="text-primary post-name">
                          <a
                            href={`/profile/read/${
                              post.postedBy && post.postedBy._id
                            }`}
                          >
                            {" "}
                            {c && c.name}
                          </a>
                        </span>{" "}
                        on <Moment format="yyyy/MM/DD">{datePosted}</Moment>
                      </p>
                      {c && c.name === data.user.name && (
                        <button
                          type="button"
                          onClick={() => {
                            removeComment({
                              postId: post._id && post._id,
                              comment_id: c._id && c._id,
                            });
                          }}
                          className="btn btn-outline-danger btn-sm"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  ))
                : null}
            </div>
          )}
          {length < 1 && (
            <h4 className="text-center text-info m-4">
              Be the first to comment!
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};
Comments.propTypes = {
  Addcomment: PropTypes.func.isRequired,
  removeComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.Post.post,
  posts: state.Post.posts,
  user: state.Auth.user,
});
export default connect(mapStateToProps, { Addcomment, removeComment })(
  Comments
);
