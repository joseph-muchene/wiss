import React, { Fragment } from "react";
import Spinner from "../../static/spinner.gif";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const Spin = ({ loading }) => {
  return (
    <Fragment>
      {loading && (
        <img
          src={Spinner}
          style={{ width: "200px", margin: "auto", display: "block" }}
          className="mt-4 "
          alt="Loading ..."
        />
      )}
    </Fragment>
  );
};
Spin.propTypes = {
  loading: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  loading: state.Auth.loading,
});
export default connect(mapStateToProps)(Spin);
