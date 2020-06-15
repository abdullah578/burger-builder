import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import CheckOutSummary from "../../Components/Order/CheckOutSummary/CheckOutSummary";
import ContactData from "./ContactData/ContactData";

const checkout = (props) => {
  return (
    <div>
      <CheckOutSummary
        ingredients={props.ingredients}
        continue={() => props.history.replace("/checkout/contact")}
        cancel={() => props.history.goBack()}
      />
      <Route path="/checkout/contact" component={ContactData} />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

export default connect(mapStateToProps)(checkout);
