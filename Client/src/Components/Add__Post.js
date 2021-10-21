import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createpost } from "../Action/Post";
const Add__Post = ({ createpost, error, loading }) => {
  const [formData, setFormData] = useState({
    title: "",
    photo: "",
    body: "",
    success: false,
  });

  ////implement loading here

  const { title, success, body, photo } = formData;

  const onChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let postData = new FormData();
    postData.append("body", body);
    postData.append("photo", photo);
    postData.append("title", title);
    createpost(postData).then(() => {
      setFormData({
        ...formData,
        success: true,
        title: "",
        body: "",
        photo: "",
      });
    });
  };

  const showErrors = () => (
    <div className="alert alert-danger mt-4  " role="alert">
      {error}
    </div>
  );

  if (success) {
    return <Redirect to="/" />;
  }
  return (
    <div className="container">
      {error && showErrors()}
      {success ? (
        <div className="alert alert-success m-4" role="alert">
          Back to{" "}
          <Link className="link" to="/">
            posts
          </Link>
        </div>
      ) : null}
      <h1 className="text-center my-4">Add a post</h1>

      <form onSubmit={onSubmit}>
        <h4>Post Photo</h4>
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

        <div>
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
        </div>
        <input type="submit" className="btn btn-success btn-lg" />

        <p className="mt-4">
          Back to
          <Link to="/">{"  "} posts</Link>
        </p>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  error: state.Post.error,
  loading: state.Post.loading,
});

Add__Post.propTypes = {
  createpost: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, { createpost })(Add__Post);
