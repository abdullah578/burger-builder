import React, { Component } from "react";
import { Route } from "react-router-dom";
import queryString from "query-string";
import CheckOutSummary from "../../Components/CheckOutSummary/CheckOutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: this.props.location.search
        ? JSON.parse(queryString.parse(this.props.location.search).ingredients)
        : {},
      price: queryString.parse(this.props.location.search).price,
    };
  }
  continueHandler = () => this.props.history.replace("/checkout/contact");
  cancelHandler = () => this.props.history.goBack();
  render() {
    return (
      <div>
        <CheckOutSummary
          ingredients={this.state.ingredients}
          continue={this.continueHandler}
          cancel={this.cancelHandler}
        />
        <Route
          path="/checkout/contact"
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.price}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
