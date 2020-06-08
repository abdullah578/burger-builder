import React from "react";
import classes from "./BurgerControl.module.css";
const burgerControl = (props) => {
  return (
    <div className={classes.BurgerControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.Less}
        onClick={props.remIngred}
        disabled={props.disable}
      >
        Less
      </button>
      <button className={classes.More} onClick={props.addIngred}>
        More
      </button>
    </div>
  );
};

export default burgerControl;
