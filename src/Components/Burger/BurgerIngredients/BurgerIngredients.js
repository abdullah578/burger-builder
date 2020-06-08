import React from "react";
import PropTypes from "prop-types";
import classes from "./BurgerIngredients.module.css";
const mapToCSS = {
  breadTop: "BreadTop",
  breadBottom: "BreadBottom",
  meat: "Meat",
  cheese: "Cheese",
  salad: "Salad",
  bacon: "Bacon",
};
const burgerIngredient = (props) => {
  let ingredient = null;
  if (props.type) {
    ingredient =
      props.type === "breadTop" ? (
        <div className={classes[mapToCSS[props.type]]}>
          <div className={classes["Seeds1"]}></div>
          <div className={classes["Seeds2"]}></div>
        </div>
      ) : (
        <div className={classes[mapToCSS[props.type]]}></div>
      );
  }
  return ingredient;
};
burgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default burgerIngredient;
