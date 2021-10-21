import React from "react";
import { TruncateBody } from "../helpers/Truncate";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";
const PostCard = ({ posts: { posts }, isAuthenticated }) => {
  return (
    <div>
      {!isAuthenticated && (
        <div className="alert alert-dismissible ">
          <h5 className="text-center text-danger mb-4 text-capitalize">
            You need to register to read post!!!
          </h5>
        </div>
      )}
      <div className="row ">
        {posts && posts.length > 0 ? (
          <div className="card-columns ">
            {posts &&
              posts.map((post) => (
                <div className="col-sm ">
                  <div className="card">
                    <img
                      src={`http://localhost:8000/api/posts/photo/${post._id}`}
                      className="img-fluid"
                      alt=""
                    />

                    <div className="card-body">
                      <div className="card-title">
                        <h4>{post.title}</h4>
                      </div>
                      <p className="text-break text">
                        {ReactHtmlParser(TruncateBody(post.body, 200))}
                      </p>
                    </div>

                    {isAuthenticated && (
                      <div className="card-footer">
                        <button className="btn btn-primary ">
                          <Link
                            to={`/read/more/${post._id}`}
                            className={`btn btn-primary `}
                          >
                            Read more
                          </Link>
                        </button>
                        <p className="text-capitalize text-danger  text-center mt-4">
                          {post.postedBy && "posted by"}{" "}
                          <a
                            href={`/profile/read/${
                              post.postedBy && post.postedBy._id
                            }`}
                          >
                            {post.postedBy && post.postedBy.name}
                          </a>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="container">
            <h1 className="text-info mt-3  text-center">No posts!!</h1>
            <p className="lead mt-4 text-center">
              Add{" "}
              <Link to={`/new/post`} className="text-link">
                new
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
PostCard.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
});
export default connect(mapStateToProps, null)(PostCard);
