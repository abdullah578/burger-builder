import React, { Component } from "react";
import Burger from "../../Components/Burger/Burger";
import BurgerControls from "../../Components/Burger/BurgerControls/BurgerControls";

const INGREDIENT_PRICES = {
  salad: 0.7,
  meat: 1,
  cheese: 0.8,
  bacon: 1.3,
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0,
    },
    price: 4,
  };
  addIngredient = (type) => {
    const ingredient_copy = { ...this.state.ingredients };
    let price = this.state.price;
    ingredient_copy[type] += 1;
    price += INGREDIENT_PRICES[type];
    this.setState({ price, ingredients: ingredient_copy });
  };
  removeIngredient = (type) => {
    const ingredient_copy = { ...this.state.ingredients };
    let price = this.state.price;
    if (!ingredient_copy[type]) return null;
    ingredient_copy[type] -= 1;
    price -= INGREDIENT_PRICES[type];
    this.setState({ price, ingredients: ingredient_copy });
  };

  render() {
    const disabledTrack = { ...this.state.ingredients };
    for (let key in disabledTrack)
      disabledTrack[key] = disabledTrack[key] === 0;
    return (
      <React.Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BurgerControls
          addIngred={this.addIngredient}
          remIngred={this.removeIngredient}
          disable={disabledTrack}
        />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
