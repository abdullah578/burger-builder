import React from "react";
import classes from "./Logo.module.css";
import burger from "../../assets/images/burger.png";

const Logo = (props) => {
  return (
    <div className={classes.Logo}>
      <img src={burger} alt="Burger-logo"></img>
    </div>
  );
};

export default Logo;
