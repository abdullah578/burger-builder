import React from "react";
import classes from "./Layout.module.css";
import Toolbar from "../Toolbar/Toolbar";

const layout = (props) => (
  <React.Fragment>
    <Toolbar></Toolbar>
    <main className={classes.content}>{props.children}</main>
  </React.Fragment>
);

export default layout;
