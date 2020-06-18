import React from "react";
import Logo from "../Logo/Logo";
import NavigationItems from "../Navigation/NavigationItems";
import classes from "./SideDrawer.module.css";
import BackDrop from "../UI/BackDrop/BackDrop";
const sideDrawer = (props) => {
  const styles = [classes.SideDrawer];
  props.open ? styles.push(classes.Open) : styles.push(classes.Close);
  return (
    <React.Fragment>
      <BackDrop show={props.open} handleClick={props.handleClose} />
      <div className={styles.join(" ")} onClick={props.handleClose}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default sideDrawer;
