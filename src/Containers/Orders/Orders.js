import React, { Component } from "react";
import { connect } from "react-redux";
import * as orderActionCreators from "../../store/actions/order";
import axios from "../../axios-config";
import WithErrorHandle from "../../hoc/WithErrorHandle/WithErrorHandle";
import Order from "../../Components/Order/Order";
import Spinner from "../../Components/UI/Spinner/Spinner";
class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.token);
  }
  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map((order) => (
        <Order
          price={order.price}
          ingredients={order.ingredients}
          key={order.id}
        />
      ));
    }
    return <div>{orders}</div>;
  }
}
const mapStateToProps = (state) => ({
  loading: state.order.dispSpinner,
  orders: state.order.orders,
  token: state.auth.token,
});
const mapDispatchToProps = (dispatch) => ({
  fetchOrders: (token) => dispatch(orderActionCreators.fetchOrders(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandle(Orders, axios));
