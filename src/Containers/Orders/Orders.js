import React, { Component } from "react";



import axios from "../../axios-config";
import WithErrorHandle from "../../hoc/WithErrorHandle/WithErrorHandle";
import Order from "../../Components/Order/Order";
import Spinner from "../../Components/UI/Spinner/Spinner";
class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then((resp) => {
        console.log(resp);
        const fetch = resp.data
          ? Object.keys(resp.data).map((key) => ({
              ...resp.data[key],
              id: key,
            }))
          : [];
        this.setState({ loading: false, orders: fetch });
      })
      .catch(this.setState({ loading: false }));
  }
  render() {
    let orders = <Spinner />;
    if (!this.state.loading) {
      orders = this.state.orders.map((order) => (
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


export default WithErrorHandle(Orders, axios);
