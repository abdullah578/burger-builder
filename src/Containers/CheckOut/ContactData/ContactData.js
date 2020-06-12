import React, { Component } from "react";
import axios from "../../../axios-config";
import classes from "./Contactdata.module.css";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import Button from "../../../Components/UI/Button/Button";
import WithErrorHandle from "../../../hoc/WithErrorHandle/WithErrorHandle";
class ContactData extends Component {
  state = { dispSpinner: false };
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
  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>

        {this.state.dispSpinner ? (
          <Spinner />
        ) : (
          <form>
            <input
              type="text"
              name="name"
              placeholder="Enter your name ..."
            ></input>
            <input
              type="email"
              name="email"
              placeholder="Enter your email ..."
            ></input>
            <input
              type="text"
              name="street"
              placeholder="Enter your street ..."
            ></input>
            <input
              type="text"
              name="postal"
              placeholder="Enter your postal..."
            ></input>
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
