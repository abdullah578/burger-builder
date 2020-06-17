import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import CheckOut from "./Containers/CheckOut/CheckOut";
import Orders from "./Containers/Orders/Orders";
import Auth from "./Containers/Auth/Auth";
import logout from "./Containers/Auth/logout";
function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/logout" component={logout} />
          <Route path="/login" component={Auth} />
          <Route path="/orders" component={Orders} />
          <Route path="/checkout" component={CheckOut} />
          <Route path="/" component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
