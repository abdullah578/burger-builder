import React from "react";
import classes from "./Order.module.css";

const Order = (props) => {
  const ingredients = Object.keys(props.ingredients).map((curr) => ({
    name: curr,
    amount: props.ingredients[curr],
  }));
  const ingredJSX = ingredients.map((curr) => (
    <span
      style={{
        textTransform: "capitalize",
        margin: "0 5px",
        padding: "3px",
        border: "1px solid #eee",
      }}
      key={curr.name}
    >
      {curr.name} ({curr.amount})
    </span>
  ));
  return (
    <div className={classes.Order}>
      <p>Ingredients :{ingredJSX}</p>
      <p>
        Price:<strong>$ {props.price}</strong>
      </p>
    </div>
  );
};

export default Order;
