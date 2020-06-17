import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../../store/actions/auth'
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
  logout: () => dispatch(actions.authLogoutCreator()),
});

export default connect(null, mapDispatchToProps)(Logout);
