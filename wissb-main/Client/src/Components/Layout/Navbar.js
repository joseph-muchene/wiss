import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signout } from "../../Action/Auth";

const Navbar = ({ isAuthenticated, signout, user }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-info rounded">
        <Link className="navbar-brand logo" to="/">
          Wiss
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample09"
          aria-controls="navbarsExample09"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample09">
          <ul className="navbar-nav mr-auto">
            {!isAuthenticated ? (
              <ul className="navbar-nav mr-auto">
                <li className="nav-item ">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav mr-auto">
                <li className="nav-item ">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item ">
                  <a
                    className="nav-link"
                    href={`/profile/read/${user._id && user._id}`}
                  >
                    Account
                  </a>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to="/new/post">
                    create post
                  </Link>
                </li>

                <button
                  type="button"
                  onClick={() => {
                    signout();
                    window.location = "/ ";
                  }}
                  className="btn btn-outline-danger btn-sm ml-4 text-white border-0"
                >
                  signout
                </button>
              </ul>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};
Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  signout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
});
export default connect(mapStateToProps, { signout })(Navbar);
