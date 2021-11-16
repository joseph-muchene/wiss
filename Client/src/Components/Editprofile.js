import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { read, updateUser } from "../Action/Profile";
import { isAuthenticated } from "../Action/Auth";
const Editprofile = ({ read, profile, error, match, updateUser, loading }) => {
  useEffect(() => {
    read(match.params.id);
  }, [match.params.id, read]);
  const [formData, setFormData] = useState({
    name: profile.name ? profile.name : "",
    email: profile.email ? profile.email : "",
    about: profile.about ? profile.about : "",
    photo: "",
    success: false,
  });

  const { data } = isAuthenticated();
  const { name, email, photo, about, success } = formData;
  const onChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setFormData({ ...formData, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    let userData = new FormData();
    name && userData.append("name", name);
    email && userData.append("email", email);
    about && userData.append("about", about);
    photo && userData.append("photo", photo);

    updateUser(userData)
      .then(() => {
        setFormData({
          ...formData,
          success: true,
        });
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <div className="container my-4">
        <div className="jumbotron">
          <h1 className="text-center">Edit Profile</h1>
          {success && (
            <a href={`/profile/read/${profile._id}`}>
              <h4 className="text-center text-info mt-2">Profile Updated!!</h4>
            </a>
          )}
        </div>
        <form action="" method="post" onSubmit={onSubmit}>
          <label for="">Profile photo</label>
          <div className="form-group">
            <img
              src={`/api/user/photo/${
                data.user && data.user._id
              }`}
              alt=""
              srcset=""
              className="img-fluid img__card mb-4"
            />

            <input
              type="file"
              accept="image/*"
              name="photo"
              onChange={onChange("photo")}
              className="form-control-file"
            />
          </div>
          <div className="form-group">
            <label for="">Name</label>
            <input
              type="text"
              name="name"
              value={!name ? "" : name}
              onChange={onChange("name")}
              className="form-control border-info outline-none border-left-0 border-right-0 border-top-0"
            />
          </div>
          <div className="form-group">
            <label for="">Email</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={onChange("email")}
              className="form-control border-info outline-none border-left-0 border-right-0 border-top-0"
            />
          </div>
          <div className="form-group">
            <label for="">About</label>
            <textarea
              type="text"
              name="about"
              onChange={onChange("about")}
              value={about}
              className="form-control "
            ></textarea>
          </div>
          <input type="submit" className="btn btn-success btn-sm" />
        </form>

        <p className="lead mt-4">
          Back to <a href={`/profile/read/${profile._id}`}>Profile</a>
        </p>
      </div>
    </div>
  );
};
Editprofile.propTypes = {
  read: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  updateUser: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToprops = (state) => ({
  profile: state.Profile.profile,
  loading: state.Profile.loading,
  error: state.Profile.error,
});

export default connect(mapStateToprops, { read, updateUser })(Editprofile);
