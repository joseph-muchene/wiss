import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { connect } from "react-redux";
import { updatePost, getPost } from "../Action/Post";
const Add__Post = ({ updatePost, match, getPost, post, error }) => {
  ////implement loading here
  useEffect(() => {
    getPost(match.params.id);
  }, [match.params.id, getPost]);

  const [formData, setFormData] = useState({
    title: post.title && post.title,
    photo: "",
    success: false,
    body: post.body && post.body,
  });
  const { title, success, body, photo } = formData;

  const onChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let postData = new FormData();
    body && postData.append("body", body);
    photo && postData.append("photo", photo);
    title && postData.append("title", title);
    updatePost(postData, post._id)
      .then(() => {
        setFormData({
          ...formData,
          success: true,
        });
      })
      .catch((err) => console.log(err.message));
  };
  if (success) {
    return <Redirect to="/" />;
  }
  const showErrors = () => (
    <div className="alert alert-danger mt-4  " role="alert">
      {error}
    </div>
  );

  return (
    <div className="container">
      {error && showErrors()}
      {success ? (
        <div className="alert alert-success m-4" role="alert">
          Back to{" "}
          <a className="link" href="/">
            posts
          </a>
        </div>
      ) : null}

      <h1 className="text-center my-4">Edit post</h1>

      <form onSubmit={onSubmit}>
        <h4>Post Photo</h4>
        <img
          src={`/api/posts/photo/${post._id}`}
          alt=""
          srcset=""
          className="img-fluid img__card mb-4"
        />
        <div className="form-group">
          <label className="text-info">Photo </label>
          <input
            onChange={onChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Title</label>
          <input
            type="text"
            onChange={onChange("title")}
            name="title"
            value={title}
            className="form-control border-info outline-none border-left-0 border-right-0 border-top-0"
          />
        </div>
        {/* <textarea
          type="text"
          name="body"
          value={body}
          onChange={onChange("body")}
          className="form-control mb-4"
          cols="30"
          rows="10"
        ></textarea> */}
        <div className="container mb-4">
          <CKEditor
            name="body"
            data={body}
            editor={ClassicEditor}
            onChange={(e, editor) => {
              setFormData({
                ...formData,
                body: editor.getData(),
              });
            }}
          ></CKEditor>
        </div>
        <input type="submit" className="btn btn-success btn-lg" />

        <p className="mt-4">
          Back to
          <a href="/"> posts</a>
        </p>
      </form>
    </div>
  );
};

Add__Post.propTypes = {
  updatepost: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  error: state.Post.error,
  post: state.Post.post,
});

export default connect(mapStateToProps, { updatePost, getPost })(Add__Post);
