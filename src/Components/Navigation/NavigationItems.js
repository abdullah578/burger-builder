import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import classes from "./NavigationItems.module.css";
const NavigationItems = (props) => {
  return (
    <ul className={classes.Navigation}>
      <li>
        <NavLink to="/" exact activeClassName={classes.active}>
          Burger Builder
        </NavLink>
      </li>
      <li>
        {props.isAuth ? (
          <NavLink to="/orders" activeClassName={classes.active}>
            Orders
          </NavLink>
        ) : null}
      </li>
      <li>
        {!props.isAuth ? (
          <NavLink to="/login" activeClassName={classes.active}>
            Authenticate
          </NavLink>
        ) : (
          <NavLink to="/logout" activeClassName={classes.active}>
            Logout
          </NavLink>
        )}
      </li>
    </ul>
  );
};
const mapStateToProps = (state) => ({
  isAuth: state.auth.token !== null,
});

export default connect(mapStateToProps)(NavigationItems);
