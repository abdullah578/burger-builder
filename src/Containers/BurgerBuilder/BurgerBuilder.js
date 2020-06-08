import React, { Component } from "react";
import Burger from "../../Components/Burger/Burger";

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 2,
      cheese: 1,
      bacon: 1,
    },
  };
  render() {
    return (
      <React.Fragment>
        <Burger ingredients={this.state.ingredients} />
        <div>Burger controls</div>
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
