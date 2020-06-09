import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../Logo/Logo";
import NavigationItems from "../Navigation/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
const Toolbar = (props) => {
  return (
    <div className={classes.Toolbar}>
      <DrawerToggle handleToggleDrawer={props.handleToggleDrawer} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default Toolbar;
