import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionsTypes";
import { Redirect } from "react-router-dom";

class Logout extends Component {
  state = {};
  componentDidMount() {
    this.props.logout();
  }
  render() {
    return <Redirect to="/" />;
  }
}
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch({ type: actionTypes.AUTH_LOGOUT }),
});

export default connect(null, mapDispatchToProps)(Logout);
