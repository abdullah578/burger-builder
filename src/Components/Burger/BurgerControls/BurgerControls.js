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
  return (
    <div className={classes.BurgerControls}>
      <p>
        Current Price:<strong>{props.price.toFixed(2)}</strong>
      </p>
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
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.handleOrder}
      >
        {props.isAuth ? "Order Now" : "Sign Up To Continue"}
      </button>
    </div>
  );
};

export default burgerControls;
