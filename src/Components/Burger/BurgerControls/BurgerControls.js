import React from "react";
import classes from "./BurgerControls.module.css";
import BurgerControl from "./BurgerControl/BurgerControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const burgerControls = (props) => {
  console.log(props.disable);
  return (
    <div className={classes.BurgerControls}>
      {controls.map((curr) => (
        <BurgerControl
          label={curr.label}
          key={curr.label}
          addIngred={() => {
            props.addIngred(curr.type);
          }}
          remIngred={() => {
            props.remIngred(curr.type);
          }}
          disable={props.disable[curr.type]}
        />
      ))}
    </div>
  );
};

export default burgerControls;
