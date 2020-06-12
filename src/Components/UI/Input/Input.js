import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  const styles = [classes.InputDiv];
  if (!props.isValid) styles.push(classes.Invalid);
  return (
    <div className={styles.join(" ")}>
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
