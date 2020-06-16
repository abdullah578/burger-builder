import React from "react";
import classes from "../Input/Input.module.css";

const Select = (props) => {
  return (
    <div className={classes.InputDiv}>
      <label htmlFor={props.name}>{props.name}</label>
      <select value={props.value} onChange={props.change}>
        {props.elementConfig.map((curr) => (
          <option value={curr.value} key={curr.value}>
            {curr.displayVal}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
