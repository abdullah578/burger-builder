import React from "react";
import classes from "./Button.module.css";
const Button = (props) => {
  const styles = [classes.Button];
  props.type === "Success"
    ? styles.push(classes.Success)
    : styles.push(classes.Danger);
  return (
    <button
      className={styles.join(" ")}
      onClick={props.clicked}
      disabled={props.isFormButton && !props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
