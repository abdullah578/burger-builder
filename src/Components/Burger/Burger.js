import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "../Burger/BurgerIngredients/BurgerIngredients";

const burger = (props) => {
  let ingredients = Object.keys(props.ingredients)
    .map((curr) => {
      return [...new Array(props.ingredients[curr])].map((c, index) => (
        <BurgerIngredient key={index} type={curr} />
      ));
    })
    .reduce((arr, elem) => arr.concat(elem), []);
  ingredients = ingredients.length ? (
    ingredients
  ) : (
    <p>Please start adding ingredients !</p>
  );

  return (
    <div className={classes.burger}>
      <BurgerIngredient type="breadTop" />
      {ingredients}
      <BurgerIngredient type="breadBottom" />
    </div>
  );
};

export default burger;
