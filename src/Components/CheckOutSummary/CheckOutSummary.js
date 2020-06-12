import React from "react";
import classes from "./CheckoutSummary.module.css";
import Burger from "../Burger/Burger";
import Button from "../UI/Button/Button";

const checkOutSummary = (props) => {
  return (
    <div className={classes.CheckOutSummary}>
      <h2>We hope you are very happy with the order</h2>
      <div style={{ width: "100%" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button type="Success" clicked={props.continue}>
        CONTINUE
      </Button>
      <Button type="Danger" clicked={props.cancel}>
        CANCEL
      </Button>
    </div>
  );
};

export default checkOutSummary;
