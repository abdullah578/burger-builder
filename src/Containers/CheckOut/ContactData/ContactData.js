import React, { Component } from "react";
import axios from "../../../axios-config";
import classes from "./Contactdata.module.css";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import Button from "../../../Components/UI/Button/Button";
import Input from "../../../Components/UI/Input/Input";
import WithErrorHandle from "../../../hoc/WithErrorHandle/WithErrorHandle";

const formConfig = (name, type, placeholder, value) => ({
  elementConfig: {
    type,
    placeholder,
    name,
  },
  value,
});
class ContactData extends Component {
  state = {
    orderForm: {
      name: formConfig("name", "text", "Your name...", ""),
      email: formConfig("email", "email", "Your email...", ""),
      street: formConfig("street", "text", "Your street...", ""),
      zipCode: formConfig("zipCode", "text", "Your ZIP Code...", ""),
      country: formConfig("country", "text", "Your country...", ""),
    },
    dispSpinner: false,
  };
  orderHandler = (e) => {
    e.preventDefault();
    this.setState({ dispSpinner: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
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
    inputParam[type].value = e.target.value;
    this.setState({ orderForm: inputParam });
  };
  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>

        {this.state.dispSpinner ? (
          <Spinner />
        ) : (
          <form>
            {Object.keys(this.state.orderForm).map((curr) => (
              <Input
                elementConfig={this.state.orderForm[curr].elementConfig}
                value={this.state.orderForm[curr].value}
                key={curr}
                change={(e) => this.inputHandler(e, curr)}
              />
            ))}

            <Button type="Success" clicked={this.orderHandler}>
              ORDER
            </Button>
          </form>
        )}
      </div>
    );
  }
}

export default WithErrorHandle(ContactData, axios);
