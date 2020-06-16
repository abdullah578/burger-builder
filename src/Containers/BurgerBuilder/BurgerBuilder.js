import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/burgerBuilder";
import axios from "../../axios-config";
import WithErrorHandle from "../../hoc/WithErrorHandle/WithErrorHandle";
import Burger from "../../Components/Burger/Burger";
import BurgerControls from "../../Components/Burger/BurgerControls/BurgerControls";
import Modal from "../../Components/UI/Modal/Modal";
import Spinner from "../../Components/UI/Spinner/Spinner";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    order: false,
    dispSpinner: false,
  };
  componentDidMount() {
    this.props.fetchIngredients();
  }
  updatePurchasable = (updatedIngredients) => {
    const sum = Object.keys(updatedIngredients)
      .map((curr) => updatedIngredients[curr])
      .reduce((sum, el) => (sum += el), 0);
    return sum !== 0;
  };
  handleOrder = () => this.setState({ order: true });
  handleOrderClose = () => this.setState({ order: false });
  handleOrderContinue = () => {
    this.props.history.push("/checkout");
  };

  render() {
    const disabledTrack = { ...this.props.ingredients };
    for (let key in disabledTrack)
      disabledTrack[key] = disabledTrack[key] === 0;
    return this.props.appBroken ? (
      <p>Sorry,this app cannot be used at the moment</p>
    ) : (
      <React.Fragment>
        <Modal show={this.state.order} removeModal={this.handleOrderClose}>
          {this.state.dispSpinner || !this.props.ingredients ? (
            <Spinner />
          ) : (
            <OrderSummary
              ingredients={this.props.ingredients}
              cancel={this.handleOrderClose}
              continue={this.handleOrderContinue}
              price={this.props.totalPrice}
            />
          )}
        </Modal>
        {this.props.ingredients ? (
          <React.Fragment>
            <Burger ingredients={this.props.ingredients} />
            <BurgerControls
              addIngred={this.props.addIngredient}
              remIngred={this.props.deleteIngredient}
              disable={disabledTrack}
              price={this.props.totalPrice}
              purchasable={this.updatePurchasable(this.props.ingredients)}
              handleOrder={this.handleOrder}
            />
          </React.Fragment>
        ) : (
          <Spinner />
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  ingredients: state.ingredients,
  totalPrice: state.totalPrice,
  appBroken: state.appBroken,
});
const mapDispatchToProps = (dispatch) => ({
  addIngredient: (ingredient) =>
    dispatch(actionCreators.addIngredient(ingredient)),
  deleteIngredient: (ingredient) =>
    dispatch(actionCreators.deleteIngredient(ingredient)),
  fetchIngredients: () => dispatch(actionCreators.fetchIngredients()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandle(BurgerBuilder, axios));
