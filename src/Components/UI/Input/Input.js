import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={classes.InputDiv}>
      <label htmlFor={props.elementConfig.name}>
        {" "}
        {props.elementConfig.name}
      </label>
      <input
        {...props.elementConfig}
        value={props.value}
        onChange={props.change}
      />
    </div>
  );
};

export default Input;
