import React from "react";
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
        <NavLink to="/orders" activeClassName={classes.active}>
          Orders
        </NavLink>
      </li>
      <li>
        <NavLink to="/login" activeClassName={classes.active}>
          Authenticate
        </NavLink>
      </li>
    </ul>
  );
};

export default NavigationItems;
