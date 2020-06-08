import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredients from "../Burger/BurgerIngredients/BurgerIngredients";

const burger = (props) => {
  const ingredients = Object.keys(props.ingredients).map((curr) => {
    return [...new Array(props.ingredients[curr])].map((c, index) => (
      <BurgerIngredients key={index} type={curr} />
    ));
  });
  return (
    <div className={classes.burger}>
      <BurgerIngredients type="breadTop" />
      {ingredients}
      <BurgerIngredients type="breadBottom" />
    </div>
  );
};

export default burger;
