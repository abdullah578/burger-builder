import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import CheckOutSummary from "../../Components/Order/CheckOutSummary/CheckOutSummary";
import ContactData from "./ContactData/ContactData";

const checkout = (props) => {
  return props.ingredients ? (
    <div>
      <CheckOutSummary
        ingredients={props.ingredients}
        continue={() => props.history.replace("/checkout/contact")}
        cancel={() => props.history.goBack()}
      />
      <Route path="/checkout/contact" component={ContactData} />
    </div>
  ) : (
    <Redirect to="/" />
  );
};
const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
  };
};

export default connect(mapStateToProps)(checkout);
