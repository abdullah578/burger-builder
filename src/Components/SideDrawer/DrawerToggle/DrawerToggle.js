import React from "react";
import classes from "./DrawerToggle.module.css";

const toggleIcon = (props) => {
  return (
    <div className={classes.DrawerToggle} onClick={props.handleToggleDrawer}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default toggleIcon;
