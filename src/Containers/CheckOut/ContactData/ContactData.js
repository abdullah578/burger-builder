import React, { Component } from "react";
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
    dispSpinner: false,
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
    this.setState({ dispSpinner: true });
    const orderForm = {};
    Object.keys(this.state.orderForm).forEach(
      (curr) => (orderForm[curr] = this.state.orderForm[curr].value)
    );
    const orderPost = {
      ingredients: this.props.ingredients,
      price: this.props.price.toFixed(2),
      formDetails: orderForm,
    };
  
    axios
      .post("/orders.json", orderPost)
      .then((resp) => {
        this.setState({ dispSpinner: false });
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({ dispSpinner: false });
      });
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
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>

        {this.state.dispSpinner ? (
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

export default WithErrorHandle(ContactData, axios);
