import React, { useState } from "react";
import { connect } from "react-redux";
import { Registeruser } from "../Action/Auth";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const Register = ({ Registeruser, errors }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",

    success: false,
  });

  //pull ot the formDATA
  const { email, success, password, name } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    Registeruser({ name, email, password }).then(() => {
      setFormData({
        ...formData,
        success: true,
        name: "",
        email: "",
        password: "",
      });
    });
  };

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
    <div className="container">
      {success ? (
        <div className="alert alert-success m-4" role="alert">
          Rediect to{" "}
          <Link className="link" to="/login">
            login
          </Link>
        </div>
      ) : null}
      {errors ? showErrors() : null}
      <h1 className="text-center m-4">Register</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label for="">name</label>
          <input
            name="name"
            onChange={onChange}
            type="text"
            value={name}
            className="form-control border-info outline-none border-left-0 border-right-0 border-top-0"
          />
        </div>
        <div className="form-group">
          <label for="">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={onChange}
            className="form-control border-info outline-none border-left-0 border-right-0 border-top-0"
          />
        </div>
        <div className="form-group">
          <label for="">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            className="form-control form-control border-info outline-none border-left-0 border-right-0 border-top-0"
          />
        </div>

        <input type="submit" className="btn btn-success" />
        <p className="mt-4">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};
Register.propTypes = {
  Registeruser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  errors: state.Auth.errors,
});

export default connect(mapStateToProps, { Registeruser })(Register);
