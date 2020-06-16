import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actionCreator from "../../../store/actions/order";
import axios from "../../../axios-config";
import classes from "./Contactdata.module.css";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import Button from "../../../Components/UI/Button/Button";
import Input from "../../../Components/UI/Input/Input";
import Select from "../../../Components/UI/Select/Select";
import WithErrorHandle from "../../../hoc/WithErrorHandle/WithErrorHandle";

const formConfig = (
  name,
  type,
  placeholder,
  value,
  validationRequirement,
  isValid,
  touch
) => ({
  elementConfig: {
    type,
    placeholder,
    name,
  },
  value,
  validationRequirement,
  isValid,
  touch,
});
class ContactData extends Component {
  state = {
    orderForm: {
      name: formConfig(
        "name",
        "text",
        "Your name...",
        "",
        {
          isRequired: true,
        },
        false,
        false
      ),
      email: formConfig(
        "email",
        "email",
        "Your email...",
        "",
        {
          isRequired: true,
        },
        false,
        false
      ),
      street: formConfig(
        "street",
        "text",
        "Your street...",
        "",
        {
          isRequired: true,
        },
        false,
        false
      ),
      zipCode: formConfig(
        "zipCode",
        "text",
        "Your ZIP Code...",
        "",
        {
          isRequired: true,

          minLength: 4,
          maxLength: 7,
        },
        false,
        false
      ),
      country: formConfig(
        "country",
        "text",
        "Your country...",
        "",
        {
          isRequired: true,
        },
        false,
        false
      ),
      deliveryMethod: {
        elementConfig: [
          { value: "fastest", displayVal: "Fastest" },
          { value: "cheapest", displayVal: "Cheapest" },
        ],
        value: "fastest",
        isValid: true,
      },
    },
    formIsValid: false,
    redirect: false,
  };
  checkValidation = (inputVal, validationRequirement) => {
    let isValid = true;
    if (validationRequirement.isRequired)
      isValid = inputVal.trim().length > 0 && isValid;
    if (validationRequirement.minLength)
      isValid =
        inputVal.trim().length >= validationRequirement.minLength && isValid;
    if (validationRequirement.maxLength)
      isValid =
        inputVal.trim().length <= validationRequirement.maxLength && isValid;
    return isValid;
  };
  orderHandler = (e) => {
    e.preventDefault();
    this.props.setSpinner();
    const orderForm = {};
    Object.keys(this.state.orderForm).forEach(
      (curr) => (orderForm[curr] = this.state.orderForm[curr].value)
    );
    const orderPost = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice.toFixed(2),
      formDetails: orderForm,
    };
    this.props.onPurchase(orderPost);
  };
  inputHandler = (e, type) => {
    e.preventDefault();
    const inputParam = { ...this.state.orderForm };
    const inputField = { ...this.state.orderForm[type] };
    inputField.value = e.target.value;
    if (inputField.validationRequirement)
      inputField.isValid = this.checkValidation(
        inputField.value,
        inputField.validationRequirement
      );
    inputField.touch = true;
    inputParam[type] = inputField;
    let formIsValid = true;
    for (let key in inputParam)
      formIsValid = inputParam[key].isValid && formIsValid;
    this.setState({ orderForm: inputParam, formIsValid });
  };
  render() {
    return this.props.purchaseOver ? (
      <Redirect to="/" />
    ) : (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>

        {this.props.dispSpinner ? (
          <Spinner />
        ) : (
          <form onSubmit={this.orderHandler}>
            {Object.keys(this.state.orderForm).map((curr) =>
              curr !== "deliveryMethod" ? (
                <Input
                  elementConfig={this.state.orderForm[curr].elementConfig}
                  value={this.state.orderForm[curr].value}
                  key={curr}
                  change={(e) => this.inputHandler(e, curr)}
                  isValid={
                    this.state.orderForm[curr].touch
                      ? this.state.orderForm[curr].isValid
                      : true
                  }
                />
              ) : (
                <Select
                  elementConfig={this.state.orderForm[curr].elementConfig}
                  value={this.state.orderForm[curr].value}
                  key={curr}
                  name={curr}
                  change={(e) => this.inputHandler(e, curr)}
                />
              )
            )}

            <Button
              type="Success"
              disabled={this.state.formIsValid}
              isFormButton={true}
            >
              ORDER
            </Button>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ingredients: state.burger.ingredients,
  totalPrice: state.burger.totalPrice,
  dispSpinner: state.order.dispSpinner,
  purchaseOver: state.order.purchase,
});

const mapDispatchToProps = (dispatch) => ({
  onPurchase: (orderData) => dispatch(actionCreator.purchaseHandler(orderData)),
  setSpinner: () => dispatch(actionCreator.setSpinner()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandle(ContactData, axios));
