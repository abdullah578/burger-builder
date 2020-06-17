import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./store/actions/auth";
import { Route, Switch } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import CheckOut from "./Containers/CheckOut/CheckOut";
import Orders from "./Containers/Orders/Orders";
import Auth from "./Containers/Auth/Auth";
import logout from "./Containers/Auth/logout";
class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }
  render() {
    const routes = this.props.isAuth ? (
      <Switch>
        <Route path="/logout" component={logout} />
        <Route path="/login" component={Auth} />
        <Route path="/orders" component={Orders} />
        <Route path="/checkout" component={CheckOut} />

        <Route path="/" component={BurgerBuilder} />
      </Switch>
    ) : (
      <Switch>
        <Route path="/logout" component={logout} />
        <Route path="/login" component={Auth} />
        <Route path="/" component={BurgerBuilder} />
      </Switch>
    );

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}
const mapStateToPrps = (state) => ({
  isAuth: state.auth.token !== null,
});

const mapDispatchToProps = (dispatch) => ({
  autoLogin: () => dispatch(actions.authCheckState()),
});

export default connect(mapStateToPrps, mapDispatchToProps)(App);
