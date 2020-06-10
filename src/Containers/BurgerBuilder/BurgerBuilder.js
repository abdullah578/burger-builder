import React, { Component } from "react";
import axios from "../../axios-config";
import Burger from "../../Components/Burger/Burger";
import BurgerControls from "../../Components/Burger/BurgerControls/BurgerControls";
import Modal from "../../Components/UI/Modal/Modal";
import Spinner from "../../Components/UI/Spinner/Spinner";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
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
    purchasable: false,
    order: false,
    dispSpinner: false,
  };
  updatePurchasable = (updatedIngredients) => {
    const sum = Object.keys(updatedIngredients)
      .map((curr) => updatedIngredients[curr])
      .reduce((sum, el) => (sum += el), 0);
    console.log(sum);
    this.setState({ purchasable: sum !== 0 });
  };
  addIngredient = (type) => {
    const ingredient_copy = { ...this.state.ingredients };
    let price = this.state.price;
    ingredient_copy[type] += 1;
    price += INGREDIENT_PRICES[type];
    this.setState({ price, ingredients: ingredient_copy });
    this.updatePurchasable(ingredient_copy);
  };
  removeIngredient = (type) => {
    const ingredient_copy = { ...this.state.ingredients };
    let price = this.state.price;
    if (!ingredient_copy[type]) return null;
    ingredient_copy[type] -= 1;
    price -= INGREDIENT_PRICES[type];
    this.setState({ price, ingredients: ingredient_copy });
    this.updatePurchasable(ingredient_copy);
  };
  handleOrder = () => this.setState({ order: true });
  handleOrderClose = () => this.setState({ order: false });
  handleOrderContinue = () => {
    this.setState({ dispSpinner: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.price,
      customer: {
        name: "Abdullah Mohammed",
        address: {
          street: "66 Pembroke Street",
          ZIPcode: "M5A 2N8",
          country: "Canada",
        },
        email: "Abdulah.am2000@gmail.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((resp) => {
        this.setState({ dispSpinner: false, order: false });
        console.log(resp);
      })
      .catch((err) => {
        this.setState({ dispSpinner: false, order: false });
        console.log(err);
      });
  };

  render() {
    const disabledTrack = { ...this.state.ingredients };
    for (let key in disabledTrack)
      disabledTrack[key] = disabledTrack[key] === 0;
    return (
      <React.Fragment>
        <Modal order={this.state.order} removeModal={this.handleOrderClose}>
          {this.state.dispSpinner ? (
            <Spinner />
          ) : (
            <OrderSummary
              ingredients={this.state.ingredients}
              cancel={this.handleOrderClose}
              continue={this.handleOrderContinue}
              price={this.state.price}
            />
          )}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BurgerControls
          addIngred={this.addIngredient}
          remIngred={this.removeIngredient}
          disable={disabledTrack}
          price={this.state.price}
          purchasable={this.state.purchasable}
          handleOrder={this.handleOrder}
        />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
