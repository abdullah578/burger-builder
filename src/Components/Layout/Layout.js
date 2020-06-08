import React from "react";
import classes from "./Layout.module.css";

const layout = (props) => (
  <React.Fragment>
    <div>Toolbar,Sidebar</div>
    <main className={classes.content}>{props.children}</main>
  </React.Fragment>
);

export default layout;
