import React, { Component } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../Toolbar/Toolbar";
import SideDrawer from "../SideDrawer/SideDrawer";
class layout extends Component {
  state = {
    drawerOpen: false,
  };
  handleDrawerClose = () => this.setState({ drawerOpen: false });
  handleToggleDrawer = () => {
    const drawerOpen = this.state.drawerOpen;
    this.setState({ drawerOpen: !drawerOpen });
  };
 
  render() {
    return (
      <React.Fragment>
        <Toolbar handleToggleDrawer={this.handleToggleDrawer} />
        <SideDrawer
          handleClose={this.handleDrawerClose}
          open={this.state.drawerOpen}
        />
        <main className={classes.content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

export default layout;
