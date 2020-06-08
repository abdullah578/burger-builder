import React from "react";
import classes from "./BurgerControls.module.css";
import BurgerControl from "./BurgerControl/BurgerControl";

const controls = [
  { label: "Salad" },
  { label: "Bacon" },
  { label: "Cheese" },
  { label: "Meat" },
];

const burgerControls = (props) => {
  return (
    <div className={classes.BurgerControls}>
      {controls.map((curr) => (
        <BurgerControl label={curr.label} key={curr.label} />
      ))}
    </div>
  );
};

export default burgerControls;
