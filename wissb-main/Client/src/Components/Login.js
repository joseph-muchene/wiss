import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { signin } from "../Action/Auth";
const Login = ({ signin, errors, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    redirect: false,
  });
  const { email, password } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    signin({ email, password }).then(() => {
      setFormData({
        ...formData,
        redirect: true,
        email: "",
        password: "",
      });
    });
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  const showErrors = () => (
    <div
      className="alert alert-secondary alert-dismissible fade show m-4"
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
      {errors ? showErrors() : null}
      <h1 className="text-center m-4">Login</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label for="">Email</label>
          <input
            type="text"
            value={email}
            name="email"
            password="email"
            onChange={onChange}
            className="form-control border-info outline-none border-left-0 border-right-0 border-top-0"
          />
        </div>
        <div className="form-group">
          <label for="">Password</label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={onChange}
            className="form-control form-control border-info outline-none border-left-0 border-right-0 border-top-0"
          />
        </div>
        <input type="submit" className="btn btn-success" />
        <p className="mt-4">
          Dont have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

Login.propTypes = {
  signin: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.Auth.errors,
  isAuthenticated: state.Auth.isAuthenticated,
});
export default connect(mapStateToProps, { signin })(Login);
