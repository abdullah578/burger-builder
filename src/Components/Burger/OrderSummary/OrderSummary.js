import React from "react";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const ingredients = Object.keys(props.ingredients).map((curr) => (
    <li key={curr}>
      <span style={{ textTransform: "capitalize" }}>{curr}</span>:
      {props.ingredients[curr]}
    </li>
  ));
  return (
    <React.Fragment>
      <h3>Order Summary</h3>
      <p>A delicious burger with the following ingredients</p>
      <ul>{ingredients}</ul>
      <p>
        <strong>Total Price:{props.price.toFixed(2)}</strong>
      </p>
      <p>Continue To Checkout ?</p>
      <Button type="Success" clicked={props.continue}>
        Continue
      </Button>
      <Button type="Danger" clicked={props.cancel}>
        Cancel
      </Button>
    </React.Fragment>
  );
};

export default orderSummary;
